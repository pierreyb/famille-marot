fetch("./data/data_marot.json").then(r => r.json()).then(data => {
    const store = f3.createStore({
            data,
            node_separation: 220,
            level_separation: 250
        }),
        view = f3.d3AnimationView({
            store,
            cont: document.querySelector("#FamilyChart")
        }),
        Card = f3.elements.Card({
            store,
            svg: view.svg,
            card_dim: {w: 180, h: 115, text_x: 10, text_y: 75, img_w: 60, img_h: 60, img_x: 55, img_y: 5},
            card_display: [
                (d) => `${d.data["fn"] || ""} ${d.data["ln"] || ""}`,
                (d) => `${d.data["bd"] || ""} - ${d.data["dd"] || ""}`
                ],
            mini_tree: true,
            link_break: false
        })

    view.setCard(Card)
    store.setOnUpdate(props => view.update(props || {}))
    store.update.tree({initial: true})
})
