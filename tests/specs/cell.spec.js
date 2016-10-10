import Vue from 'vue'
import Cell from 'components/cell'

describe('Cell component test', () => {
    it('test slot content is done', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<div><Cell arrow><p slot="content">Done</p><Cell></div>',
            components: {
                Cell: Cell
            }
        })

        expect(vm.$el.querySelector('p').textContent).to.equal('Done')
    })
})
