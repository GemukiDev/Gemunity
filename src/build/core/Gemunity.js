import { Game } from "./Core.js";
import { EventEmitter } from "./EventEmiter.js";
import { Input } from "./Input.js";
import { Resources } from "./Resources.js";
import { Time } from "./Time.js";
export * from "./Core.js";
export * from "./Time.js";
export * from "./GameObject.js";
export * from "./Transform.js";
export * from "./Camera.js";
export * from "./Sprite.js";
export * from "./SpriteRenderer.js";
export * from "./MonoBehaviour.js";
export * from "./Renderer.js";
export * from "./Input.js";
export * from "./KeyCode.js";
export * from "./Collider2D.js";
export * from "./CollisionManager.js";
export * from "./Config.js";
export * from "./Vectors.js";
export * from "./Animator.js";
export * from "./AudioClip.js";
export * from "./AudioSource.js";
export * from "./Bounds.js";
export * from "./BoxCollider2D.js";
export * from "./CircleCollider2D.js";
export * from "./Color.js";
export * from "./Coroutine.js";
export * from "./Debug.js";
export * from "./EventEmiter.js";
export * from "./List.js";
export * from "./Mathf.js";
export * from "./Media.js";
export * from "./Random.js";
export * from "./Resources.js";
export * from "./TextRenderer.js";
export * from "./Gemunity.js";
export class Gemunity {
    static Init() {
        this.veil = document.querySelector(".veil");
        this.wellcomePanel = document.querySelector(".wellcome");
        this.playBtn = document.querySelector(".playBtn");
        this.loadbar = document.querySelector(".loadbar");
        this.loadbarFill = document.querySelector(".loadbar-fill");
        this.wellcomePanel.style.display = "none";
        this.playBtn.addEventListener("click", this.Play.bind(this));
        Resources.AddLoadListener(this.LoadPercentUpdate.bind(this));
        this.ShowLogo(300, 300);
        Time.time = new Date().valueOf() / 1000;
        Time.deltaTime = 0;
        requestAnimationFrame(Gemunity.Tick);
    }
    static Tick() {
        const oldTime = Time.time;
        Time.time = new Date().valueOf() / 1000;
        Time.deltaTime = Time.time - oldTime;
        if (Game.game) {
            Game.game.Tick();
        }
        Input.Tick();
        requestAnimationFrame(Gemunity.Tick);
    }
    static ShowLogo(width, height) {
        const smallCanvas = document.createElement("canvas");
        smallCanvas.width = width;
        smallCanvas.height = height;
        if (this.veil.childElementCount >= 1) {
            this.veil.insertBefore(smallCanvas, this.veil.childNodes[0]);
        }
        else {
            this.veil.appendChild(smallCanvas);
        }
        const ctx = smallCanvas.getContext("2d");
        const img = new Image();
        smallCanvas.style.opacity = "0";
        smallCanvas.style.transition = "opacity 0.7s ease";
        img.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIyMDBweCIgaGVpZ2h0PSIyMDBweCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwMCAyMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iI0VBRUFFQSIgZD0iTTk1LjIsMTE3LjRIOTZ2My42bDAsMGMwLjMtMC45LDEuMi0xLjQsMi4xLTEuNGMxLjksMCwyLjgsMS41LDIuOCwzLjNzLTAuOSwzLjMtMi44LDMuMw0KCQljLTEsMC0xLjktMC41LTIuMi0xLjRsMCwwdjEuMmgtMC43VjExNy40eiBNOTguMSwxMjAuM2MtMS42LDAtMi4yLDEuNC0yLjIsMi42czAuNiwyLjYsMi4yLDIuNmMxLjQsMCwyLTEuNCwyLTIuNg0KCQlTOTkuNSwxMjAuMyw5OC4xLDEyMC4zeiIvPg0KCTxwYXRoIGZpbGw9IiNFQUVBRUEiIGQ9Ik0xMDEuNCwxMTkuOGgwLjhsMiw1LjNsMS45LTUuM2gwLjhsLTIuNyw3LjFjLTAuNCwxLTAuNywxLjMtMS42LDEuM2MtMC4zLDAtMC41LDAtMC42LTAuMXYtMC42DQoJCWMwLjIsMCwwLjMsMC4xLDAuNSwwLjFjMC43LDAsMC44LTAuNCwxLjEtMWwwLjMtMC43TDEwMS40LDExOS44eiIvPg0KCTxwYXRoIGZpbGw9IiNFQUVBRUEiIGQ9Ik0xMTYuNCwxMjIuOWMtMC4yLDAuNS0wLjIsMSwwLjIsMWMxLjEsMCwyLTEuNiwyLTNjMC0yLTEuNi0zLjItMy40LTMuMmMtMi4yLDAtMy44LDEuOC0zLjgsNA0KCQlzMS42LDMuOSwzLjgsMy45YzEuMiwwLDIuNC0wLjYsMy4xLTEuNmgwLjZjLTAuNywxLjMtMi4yLDIuMS0zLjcsMi4xYy0yLjYsMC00LjQtMi00LjQtNC41czItNC40LDQuNC00LjRjMi4zLDAsNC4xLDEuNSw0LjEsMy43DQoJCWMwLDEuOS0xLjQsMy41LTIuOCwzLjVjLTAuNCwwLTAuOC0wLjMtMC44LTAuOGwwLDBjLTAuNCwwLjQtMC45LDAuOC0xLjUsMC44Yy0xLDAtMS42LTAuOC0xLjYtMS43YzAtMS43LDEuMS0zLjUsMi44LTMuNQ0KCQljMC41LDAsMSwwLjMsMS4zLDFsMC4zLTAuOGgwLjZMMTE2LjQsMTIyLjl6IE0xMTMuMywxMjIuNmMwLDAuNywwLjQsMS4yLDEsMS4yYzEuMSwwLDItMS44LDItMi44YzAtMC42LTAuNS0xLjEtMC45LTEuMQ0KCQlDMTE0LjEsMTE5LjksMTEzLjMsMTIxLjUsMTEzLjMsMTIyLjZ6Ii8+DQoJPHBhdGggZmlsbD0iI0VBRUFFQSIgZD0iTTEyOCwxMjZoLTAuNmwtMC4xLTEuNmwwLDBjLTAuNiwxLjItMS43LDEuNy0zLDEuN2MtMi43LDAtNC0yLjEtNC00LjVjMC0yLjQsMS4zLTQuNSw0LTQuNQ0KCQljMS44LDAsMy4zLDEsMy42LDIuOGgtMC44Yy0wLjEtMS0xLjEtMi4xLTIuOC0yLjFjLTIuMywwLTMuMiwxLjktMy4yLDMuOGMwLDEuOSwxLDMuOCwzLjIsMy44YzEuOSwwLDMtMS4zLDMtMy4xaC0yLjl2LTAuN2gzLjYNCgkJVjEyNnoiLz4NCgk8cGF0aCBmaWxsPSIjRUFFQUVBIiBkPSJNMTI5LjksMTIzLjFjMCwxLjEsMC42LDIuNCwyLDIuNGMxLjEsMCwxLjctMC42LDEuOS0xLjZoMC44Yy0wLjMsMS40LTEuMSwyLjItMi43LDIuMg0KCQljLTIsMC0yLjgtMS41LTIuOC0zLjNjMC0xLjYsMC44LTMuMywyLjgtMy4zczIuOCwxLjcsMi43LDMuNWgtNC43VjEyMy4xeiBNMTMzLjksMTIyLjVjMC0xLjEtMC43LTIuMi0yLTIuMmMtMS4yLDAtMS45LDEuMS0yLDIuMg0KCQlIMTMzLjl6Ii8+DQoJPHBhdGggZmlsbD0iI0VBRUFFQSIgZD0iTTEzNS43LDExOS44aDAuN3YxbDAsMGMwLjQtMC43LDEtMS4yLDItMS4yYzAuOCwwLDEuNSwwLjQsMS44LDEuMmMwLjQtMC44LDEuMi0xLjIsMi0xLjINCgkJYzEuNCwwLDIuMSwwLjcsMi4xLDIuMnY0LjJoLTAuOHYtNC4yYzAtMS0wLjQtMS42LTEuNS0xLjZjLTEuMywwLTEuNywxLjEtMS43LDIuMnYzLjVoLTAuN3YtNC4yYzAtMC44LTAuMy0xLjUtMS4zLTEuNQ0KCQljLTEuMywwLTEuOCwxLTEuOCwyLjN2My41aC0wLjhWMTE5LjhMMTM1LjcsMTE5Ljh6Ii8+DQoJPHBhdGggZmlsbD0iI0VBRUFFQSIgZD0iTTE1MC43LDEyNkgxNTB2LTEuMWwwLDBjLTAuNCwwLjgtMS4yLDEuMy0yLjEsMS4zYy0xLjYsMC0yLjItMC45LTIuMi0yLjR2LTRoMC44djRjMCwxLjEsMC41LDEuNywxLjcsMS43DQoJCWMxLjMsMCwxLjktMS4yLDEuOS0yLjV2LTMuM2gwLjh2Ni4zSDE1MC43eiIvPg0KCTxwYXRoIGZpbGw9IiNFQUVBRUEiIGQ9Ik0xNTIuMSwxMTcuNGgwLjh2NS40bDMuNC0zaDFsLTIuNiwyLjNsMi44LDMuOWgtMC45bC0yLjQtMy40bC0xLjIsMXYyLjRoLTAuOEwxNTIuMSwxMTcuNEwxNTIuMSwxMTcuNHoiLz4NCgk8cGF0aCBmaWxsPSIjRUFFQUVBIiBkPSJNMTU4LjEsMTE3LjRoMC44djEuMmgtMC44VjExNy40eiBNMTU4LjEsMTE5LjhoMC44djYuMmgtMC44VjExOS44eiIvPg0KCTxwYXRoIGZpbGw9IiNFQUVBRUEiIGQ9Ik0xNjAuNSwxMTcuNGgzYzIuNiwwLjEsMy45LDEuNSwzLjksNC4zcy0xLjQsNC4yLTMuOSw0LjNoLTNWMTE3LjR6IE0xNjEuMywxMjUuM2gxLjdjMi41LDAsMy41LTEsMy41LTMuNg0KCQljMC0yLjYtMS4xLTMuNi0zLjUtMy42aC0xLjdWMTI1LjN6Ii8+DQoJPHBhdGggZmlsbD0iI0VBRUFFQSIgZD0iTTE2OSwxMjMuMWMwLDEuMSwwLjYsMi40LDIsMi40YzEuMSwwLDEuNy0wLjYsMS45LTEuNmgwLjhjLTAuMywxLjQtMS4xLDIuMi0yLjcsMi4yYy0yLDAtMi44LTEuNS0yLjgtMy4zDQoJCWMwLTEuNiwwLjgtMy4zLDIuOC0zLjNzMi44LDEuNywyLjcsMy41SDE2OVYxMjMuMXogTTE3MywxMjIuNWMwLTEuMS0wLjctMi4yLTItMi4yYy0xLjIsMC0xLjksMS4xLTIsMi4ySDE3M3oiLz4NCgk8cGF0aCBmaWxsPSIjRUFFQUVBIiBkPSJNMTc0LjEsMTE5LjhoMC44bDEuOSw1LjRsMCwwbDEuOS01LjRoMC44bC0yLjMsNi4yaC0wLjhMMTc0LjEsMTE5Ljh6Ii8+DQo8L2c+DQo8Zz4NCgk8cGF0aCBmaWxsPSIjRUFFQUVBIiBkPSJNMzcuNywxMDQuM2MtMS44LDIuMy00LjEsMy4xLTYuMywzLjFjLTcuMSwwLTExLjItNS4zLTExLjItMTEuOWMwLTYuOCw0LjItMTIuMSwxMS4yLTEyLjENCgkJYzQuNywwLDkuMSwyLjksOS42LDguMWgtNC44Yy0wLjYtMi41LTIuNS0zLjgtNC44LTMuOGMtNC41LDAtNi4yLDMuOC02LjIsNy44YzAsMy44LDEuNyw3LjYsNi4yLDcuNmMzLjMsMCw1LjEtMS44LDUuNC00LjloLTUuMQ0KCQl2LTMuN2g5LjZ2MTIuM2gtMy4yTDM3LjcsMTA0LjN6Ii8+DQoJPHBhdGggZmlsbD0iI0VBRUFFQSIgZD0iTTQ4LjgsOTkuOGMwLjEsMi45LDEuNSw0LjIsNC4xLDQuMmMxLjgsMCwzLjMtMS4xLDMuNi0yLjFoNGMtMS4zLDMuOS00LDUuNi03LjcsNS42DQoJCWMtNS4yLDAtOC40LTMuNi04LjQtOC43YzAtNSwzLjQtOC43LDguNC04LjdjNS42LDAsOC4zLDQuNyw4LDkuOEg0OC44eiBNNTYuMiw5Ni45Yy0wLjQtMi4zLTEuNC0zLjUtMy42LTMuNQ0KCQljLTIuOSwwLTMuNywyLjItMy44LDMuNUg1Ni4yeiIvPg0KCTxwYXRoIGZpbGw9IiNFQUVBRUEiIGQ9Ik02My41LDkwLjRoNC4zdjIuMmgwLjFjMS4yLTEuNywyLjktMi43LDUuMS0yLjdjMi4xLDAsMy45LDAuOCw0LjgsMi44YzEtMS40LDIuNy0yLjgsNS0yLjgNCgkJYzMuNSwwLDYsMS42LDYsNS45djExLjFoLTQuNXYtOS40YzAtMi4yLTAuMi00LTIuOC00Yy0yLjYsMC0zLDIuMS0zLDQuMnY5LjJoLTQuNXYtOS4zYzAtMS45LDAuMS00LjEtMi44LTQuMQ0KCQljLTAuOSwwLTMuMSwwLjYtMy4xLDMuOHY5LjZoLTQuNVY5MC40eiIvPg0KCTxwYXRoIGZpbGw9IiNFQUVBRUEiIGQ9Ik0xMDcuOSwxMDYuOWgtNC4zdi0yLjNoLTAuMWMtMS4yLDEuOS0zLjEsMi44LTUuMSwyLjhjLTQuOCwwLTYtMi43LTYtNi44VjkwLjRoNC41djkuMw0KCQljMCwyLjcsMC44LDQuMSwyLjksNC4xYzIuNSwwLDMuNS0xLjQsMy41LTQuN3YtOC43aDQuNVYxMDYuOXoiLz4NCgk8cGF0aCBmaWxsPSIjRUFFQUVBIiBkPSJNMTExLjMsOTAuNGg0LjN2Mi4zaDAuMWMxLjItMS45LDMuMS0yLjgsNS4xLTIuOGM0LjgsMCw2LDIuNyw2LDYuOHYxMC4yaC00LjV2LTkuM2MwLTIuNy0wLjgtNC4xLTIuOS00LjENCgkJYy0yLjUsMC0zLjUsMS40LTMuNSw0Ljd2OC43aC00LjVWOTAuNHoiLz4NCgk8cGF0aCBmaWxsPSIjRUFFQUVBIiBkPSJNMTM1LDg3LjhoLTQuNXYtMy43aDQuNVY4Ny44eiBNMTMwLjQsOTAuNGg0LjV2MTYuNWgtNC41VjkwLjR6Ii8+DQoJPHBhdGggZmlsbD0iI0VBRUFFQSIgZD0iTTE0NC4zLDkwLjRoMy4zdjNoLTMuM3Y4LjJjMCwxLjUsMC40LDEuOSwxLjksMS45YzAuNSwwLDAuOSwwLDEuNC0wLjF2My41Yy0wLjgsMC4xLTEuOCwwLjItMi43LDAuMg0KCQljLTIuOCwwLTUuMi0wLjYtNS4yLTMuOXYtOS44SDEzN3YtM2gyLjh2LTVoNC41VjkwLjR6Ii8+DQoJPHBhdGggZmlsbD0iI0VBRUFFQSIgZD0iTTE1Ny45LDEwOWMtMSwyLjctMi42LDMuNy01LjcsMy43Yy0wLjksMC0xLjktMC4xLTIuOC0wLjJ2LTMuN2MwLjksMC4xLDEuOCwwLjIsMi43LDAuMg0KCQljMS42LTAuMiwyLjEtMS44LDEuNi0zLjFsLTUuOC0xNS41aDQuOWwzLjcsMTEuM2gwLjFsMy42LTExLjNoNC43TDE1Ny45LDEwOXoiLz4NCjwvZz4NCjwvc3ZnPg0K";
        img.addEventListener("load", () => {
            console.log("loaded");
            ctx.drawImage(img, 0, 0, width, height);
            smallCanvas.style.opacity = "1";
        });
    }
    static ShowWellcome() {
        this.wellcomePanel.style.display = "block";
        this.loadbar.style.display = "none";
    }
    static OnPlay(listener) {
        this.playBtnEvent.AddListener(listener);
    }
    static Play() {
        this.veil.style.display = "none";
        this.playBtnEvent.Invoke();
    }
    static LoadPercentUpdate(percent) {
        this.loadbarFill.style.width = percent * 100 + "%";
    }
}
Gemunity.playBtnEvent = new EventEmitter();
