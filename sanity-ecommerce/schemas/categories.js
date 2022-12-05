export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [{
        name: 'spores',
        type: 'reference',
		title: 'Spores',
        to: [{type: 'product' }]

    },
    {
        name: 'supplies',
        type: 'reference',
        title: 'Supplies',
        to: [{ type: 'product' }]
    }, 
    {
        name: 'labgear',
        type: 'reference',
        title: 'Labgear',
        to: [{ type: 'product' }]
    }
    ]
}