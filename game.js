export default class Game {
    dHealth = 0;
    dHealthFull = 0;
    pHealth = 0;
    pHealthFull = 0;
    dAttack = 0;
    pAttack = 0;
    cardsLeft = 0;

    moveListeners = [];
    winListeners = [];
    loseListeners = [];
    tieListeners = [];

    constructor(dragonHealth, dragonAttack) {
        this.dHealth = Math.ceil(dragonHealth);
        this.dHealthFull = dragonHealth;
        this.dAttack = Math.ceil(dragonAttack);
        let temp1 = Math.ceil(this.dHealth/4);
        let temp2 = dragonAttack*2;
        
        if(temp1 > temp2){
            this.pHealth = temp1;
        } else if(temp2 >= temp1){
            this.pHealth = temp2 + 1;
        }
        this.pHealthFull = this.pHealth;

        temp1 = Math.ceil(dragonHealth/10);
        temp2 = Math.ceil(dragonAttack*1.5);

        if(temp1 > temp2){
            this.pAttack = temp1;
        } else if(temp2 >= temp1){
            this.pAttack = temp2;
        }

        this.cardsLeft = 51;
    }

    restart(dragonHealth, dragonAttack){
        this.dHealth = dragonHealth;
        this.dHealthFull = dragonHealth;
        this.dAttack = dragonAttack;
        let temp1 = Math.ceil(this.dHealth/4);
        let temp2 = dragonAttack*2;
        
        if(temp1 > temp2){
            this.pHealth = temp1;
        } else if(temp2 >= temp1){
            this.pHealth = temp2 + 1;
        }
        this.pHealthFull = this.pHealth;

        temp1 = Math.ceil(dragonHealth/10);
        temp2 = Math.ceil(dragonAttack*1.5);

        if(temp1 > temp2){
            this.pAttack = temp1;
        } else if(temp2 >= temp1){
            this.pAttack = temp2;
        }

        this.cardsLeft = 51;
    }

    move(decision, card) {
        
        if (decision == "cave"){
            if (card == "HEARTS"){
                this.pHealth = this.pHealthFull;
            }
            if (card == "DIAMONDS"){
                let temp1 = this.dHealthFull;
                let temp2 = this.dHealth + Math.ceil(this.dHealth/8);
                if (temp1 > temp2){
                    this.dHealth = temp2;
                } else {
                    this.dHealth = this.dHealthFull;
                }
            }
        }
        if (decision == "shield"){
            if (card == "SPADES"){
                this.dHealth = this.dHealth - Math.ceil(this.pAttack*(3/4));
            } else {
                this.pHealth = this.pHealth - Math.ceil(this.dAttack/2);
                this.dHealth = this.dHealth - Math.ceil(this.pAttack*(3/4));
            }
            if (card == "DIAMONDS"){
                let temp1 = this.dHealthFull;
                let temp2 = this.dHealth + Math.ceil(this.dHealth/8);
                if (temp1 > temp2){
                    this.dHealth = temp2;
                } else {
                    this.dHealth = this.dHealthFull;
                }
            }
        }
        if (decision == "attack"){
            if (card == "CLUBS"){
                this.pHealth = this.pHealth - this.dAttack;
                this.dHealth = this.dHealth - 2*this.pAttack;
            } else {
                this.pHealth = this.pHealth - this.dAttack;
                this.dHealth = this.dHealth - this.pAttack;
            }
            if (card == "DIAMONDS"){
                let temp1 = this.dHealthFull;
                let temp2 = this.dHealth + Math.ceil(this.dHealth/8);
                if (temp1 > temp2){
                    this.dHealth = temp2;
                } else {
                    this.dHealth = this.dHealthFull;
                }
            }
        }

        let gameReportHolder = this.getGameReport();
        if (this.dHealth <= 0){
            this.winListeners.forEach(function (item, index, array){ 
                item(gameReportHolder);
            });

        } else if (this.pHealth <= 0){
            this.loseListeners.forEach(function (item, index, array){ 
                item(gameReportHolder);
            });

        } else if (this.cardsLeft <= 0){
            this.tieListeners.forEach(function (item, index, array){ 
                item(gameReportHolder);
            });
        } else {
            this.moveListeners.forEach(function (item, index, array){ 
                item(gameReportHolder);
            });
        }
        this.cardsLeft = this.cardsLeft - 1;
        

    }

    onMove(callback) { 
        this.moveListeners.push(callback);
    }

    onWin(callback) {
        this.winListeners.push(callback);
    }

    onLose(callback) { 
        this.loseListeners.push(callback);
    }

    onTie(callback) { 
        this.tieListeners.push(callback);
    }

    getGameReport() {
        return { dHealthFull: this.dHealthFull, dHealth: this.dHealth, pHealthFull: this.pHealthFull, pHealth: this.pHealth, dAttack: this.dAttack, pAttack: this.pAttack, cardsLeft: this.cardsLeft};
    }

}
