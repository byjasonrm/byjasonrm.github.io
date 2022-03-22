import * as Badges from '../data/badges.js';
import * as WallOfFame from '../data/wof.js';




$(document).ready(function(){

    let members_array = WallOfFame.list.filter(x => x.isCurrentMember == true);
    let winners_array = WallOfFame.list.filter(x => x.isCurrentMember == false);

    let sorted_members = members_array.sort(sortWinners);
    let sorted_array = winners_array.sort(sortWinners);
    let list = $.merge(sorted_members, sorted_array);

    console.log(list);

    for(let i=0; i<list.length; i++){
        let badges_list = [];
        for(let j=0; j<list[i].badges.length; j++){
            let found = Badges.list.find(x => x.id == list[i].badges[j]);
            badges_list.push(found);
        }

        if(badges_list.length > 0){
            let $badges = $("<div class='winner-badges'></div>");
            for(let k=0; k<badges_list.length; k++){
                let $badge = $("<div style='background:url(" + badges_list[k].image + ") center center no-repeat; background-size:contain' class='badge'></div>");
                $badges.append($badge);
            }

            let $winner = $("<div class='winner'><div class='winner-name'>" + list[i].name + "</div></div>");
            $winner.append($badges);
            $(".winners").append($winner);
        }
    }

});

function sortWinners( a, b ) {
    if ( a.badges.length < b.badges.length ){
      return 1;
    }
    if ( a.badges.length > b.badges.length ){
      return -1;
    }
    return 0;
  }
  