import { BoxCollider2D } from "./BoxCollider2D.js";
import { CircleCollider2D } from "./CircleCollider2D.js";
import { Collision2DManifold } from "./CollisionManifold.js";
import "../Extensions/Extensions.js";
import { Mathf } from "../Math/Mathf.js";
import { Vector2 } from "../Geometry/Vectors.js";
export class CollisionManager {
    static TestCollision(col1, col2) {
        if (this.Collides(col1, col2)) {
            if (col1.contacts.includes(col2)) {
                this.StayCollision(col1, col2);
                this.StayCollision(col2, col1);
            }
            else {
                this.EnterCollision(col1, col2);
                this.EnterCollision(col2, col1);
            }
        }
        else {
            if (col1.contacts.includes(col2)) {
                this.ExitCollision(col1, col2);
                this.ExitCollision(col2, col1);
            }
        }
    }
    static Collides(col1, col2) {
        if (col1 instanceof CircleCollider2D && col2 instanceof CircleCollider2D)
            return this.TestCircleCollision(col1, col2);
        else if (col1 instanceof BoxCollider2D && col2 instanceof BoxCollider2D)
            return this.TestBoxCollision(col1, col2);
        else if (col1 instanceof BoxCollider2D && col2 instanceof CircleCollider2D)
            return this.TestBoxToCircleCollision(col1, col2);
        else if (col1 instanceof CircleCollider2D && col2 instanceof BoxCollider2D)
            return this.TestBoxToCircleCollision(col2, col1);
        else
            return false;
    }
    static TestCircleCollision(col1, col2) {
        return col1.transform.position.Substract(col2.transform.position).sqrMagnitude <= Math.pow(col1.scaledRadius + col2.scaledRadius, 2);
    }
    static TestBoxCollision(col1, col2) {
        if (Mathf.Approximately(col1.gameObject.transform.rotation, 0) &&
            Mathf.Approximately(col2.gameObject.transform.rotation, 0)) {
            return col1.GetBounds().CollidesWith(col2.GetBounds());
        }
        else {
            //TODO rotate to axis aligned
            return this.AABBToAABBCollision(col1, col2);
        }
    }
    static TestBoxToCircleCollision(box, circle) {
        //TODO rotate to axis aligned
        const circleCenter = circle.center;
        const rectangleCenter = box.center;
        const rectangleSize = box.scaledSize;
        const distance = new Vector2(0, 0);
        distance.x = Math.abs(circleCenter.x - rectangleCenter.x);
        distance.y = Math.abs(circleCenter.y - rectangleCenter.y);
        if (distance.x > (rectangleSize.x / 2 + circle.radius)) {
            return false;
        }
        if (distance.y > (rectangleSize.y / 2 + circle.radius)) {
            return false;
        }
        if (distance.x <= (rectangleSize.x / 2)) {
            return true;
        }
        if (distance.y <= (rectangleSize.y / 2)) {
            return true;
        }
        const cornerDistanceSquared = Math.pow(distance.x - rectangleSize.x / 2, 2) + Math.pow(distance.y - rectangleSize.y / 2, 2);
        return (cornerDistanceSquared <= (circle.radius * circle.radius));
    }
    static AABBToAABBCollision(box1, box2) {
        return false;
    }
    static StayCollision(col, otherCol) {
        col.OnCollisionStay2D(otherCol);
    }
    static EnterCollision(col, otherCol) {
        col.gameObject.GetAllComponents().forEach(c => c.OnCollisionEnter2D(otherCol));
        col.contacts.push(otherCol);
    }
    static ExitCollision(col, otherCol) {
        col.gameObject.GetAllComponents().forEach(c => c.OnCollisionExit2D(otherCol));
        col.contacts.remove(otherCol);
    }
    static FindCollisionFeatures(col1, col2) {
        const sumRadius = col1.radius + col2.radius;
        const distance = col1.center.Sum(col2.center);
        if (distance.sqrMagnitude > sumRadius * sumRadius) {
            return Collision2DManifold.None;
        }
        const depth = Math.abs(distance.magnitude - sumRadius) * 0.5;
        const normal = distance.normalized;
        const distanceToPoint = col1.radius - depth;
        const contactPoint = col1.center.Sum(normal.Multiply(distanceToPoint));
        const result = new Collision2DManifold(normal, depth);
        result.AddContactPoint(contactPoint);
        return result;
    }
}
