export function Card() {

    return function ({d}) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", 'g'),
        gender_class = d.data.data.gender === 'M' ? 'card-male' : d.data.data.gender === 'F' ? 'card-female' : 'card-genderless'

        el.innerHTML = (`
        <g class="card ${gender_class}" data-id="${d.data.id}" data-cy="card">
        </g>
        `)

        return el
    }
}