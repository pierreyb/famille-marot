export function Card(d) {
    const gender_class = d.data.gender === 'M' ? 'card-male' : d.data.gender === 'F' ? 'card-female' : 'card-genderless';

    d3.select(this)
    .attr("id",d.id)
    .classed(gender_class,true)
    ;

    d3.select(this).select(".familyCardName")
    .text((d.data.fn || "") + " " + (d.data.ln || ""));

    let date = d.data.bd !== undefined ?d.data.bd : "" ;
    d.data.dd !== undefined ? date + " - " + d.data.dd : " ";
    d3.select(this).select(".familyCardBirth")
    .text(date) ;


}