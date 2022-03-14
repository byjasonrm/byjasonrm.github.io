import * as Badges from '../../data/badges.js';
import * as WallOfFame from '../../data/wof.js';




$(document).ready(function(){

    for(let i=0; i<WallOfFame.list.length; i++){
        let badges_list = [];
        for(let j=0; j<WallOfFame.list[i].badges.length; j++){
            let found = Badges.list.find(x => x.id == WallOfFame.list[i].badges[j]);
            badges_list.push(found);
        }

        if(badges_list.length > 0){
            let $badges = $("<div class='winner-badges'></div>");
            for(let k=0; k<badges_list.length; k++){
                let $badge = $("<div style='background:url(" + badges_list[k].image + ") center center no-repeat; background-size:contain' class='badge'></div>");
                $badges.append($badge);
            }

            let $winner = $("<div class='winner'><div class='winner-name'>" + WallOfFame.list[i].name + "</div></div>");
            $winner.append($badges);
            $("p").append($winner);
        }
    }

});