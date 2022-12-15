export async function fetchfamilyData(data_url) {
    try {
        let res = await fetch(data_url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export function createFamilyLinks(data) {
    function addFamilyLink(source, target, type) {
        for (let i=0;i < target.length;i++) {
            familyLink.push(new Object({source: source, target: target[i], type: type}));
        }
    }

    // For each rels type we create a link of this type
    function listFamily(item) {
        for (const [key, value] of Object.entries(item.rels)) {
            let target = value;
            if (typeof value === 'string') {
                target = [value];
            }
            addFamilyLink(item.id,target,key) ;
        }
    }

    let familyLink = [] ;
    data.forEach(listFamily) ;

    return familyLink ;
}
