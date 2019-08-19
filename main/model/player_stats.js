export default class player_stats{
    constructor(username, Xlocation, Ylocation) {
        this.username = username;
        this.Xlocation = Xlocation;
        this.Ylocation = Ylocation;
        this.weapon = "knife_";
        this.health = "100";
        this.action="idle"
    };
    computeDistance(x1, y1, x2, y2){
        return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
    }
    attack() {
        return ""
    }
}