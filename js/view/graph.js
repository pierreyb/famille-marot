export function graph(nodes,nodeWidth,nodeHeight) {
    const lineSeparation = 100 ;
    const nodeSeparation = 60 ;

    // we set the card height based on the family level
    nodes.forEach(function (el) {el.fy = (lineSeparation + nodeHeight) * el.familyLevel - nodeHeight}) ;

    let startNode = nodes.filter(el => el.familyLevel === 1)[0] ;
}

