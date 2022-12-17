export function Card(d) {

    console.log(this);
    const card_width = 180 ;
    const card_heigt = 115 ;
    const gender_class = d.data.gender === 'M' ? 'card-male' : d.data.gender === 'F' ? 'card-female' : 'card-genderless';

    d3.select(this)
    .attr("id",d.id)
    .attr("class","card " + gender_class)
    .append("rect")
    .attr("width", card_width)
    .attr("height", card_heigt)
    .attr("rx", "4")
    .attr("ry","4")
    .attr("class","card-outline card-main-outline")
    ;

}