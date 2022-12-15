
export function setParents(familyMember) {
    familyMember['rels']['parents'] = [];
    if (familyMember['rels']['father'] !== undefined) {
        familyMember['rels']['parents'].push(familyMember['rels']['father']);
    }
    if (familyMember['rels']['mother'] !== undefined) {
        familyMember['rels']['parents'].push(familyMember['rels']['mother']);
    }
}

export function setFamilyLevel(familyMember,index,arr) {
    if (familyMember['familyLevel'] === undefined) {
        familyMember['familyLevel'] = 1;
    }
    let familyLevel = familyMember['familyLevel'] ;

    // Parents get familyLevel - 1 / Spouses get familyLevel / Children get familyLevel + 1
    if (familyMember['rels']['parents'] !== undefined) {
        for (let i=0;i < familyMember['rels']['parents'].length;i++) {
            arr.find(element => element.id === familyMember['rels']['parents'][i])['familyLevel'] = familyLevel - 1 ;
        }
    }
    if (familyMember['rels']['spouses'] !== undefined) {
        for (let i=0;i < familyMember['rels']['spouses'].length;i++) {
            arr.find(element => element.id === familyMember['rels']['spouses'][i])['familyLevel'] = familyLevel  ;
        }
    }
    if (familyMember['rels']['children'] !== undefined) {
        for (let i=0;i < familyMember['rels']['children'].length;i++) {
            arr.find(element => element.id === familyMember['rels']['children'][i])['familyLevel'] = familyLevel + 1 ;
        }
    }

}

// function to retreive the parent object based on the array
// let parents = arr.filter(element => (familyMember['rels']['parents']).includes(element.id)) ;
