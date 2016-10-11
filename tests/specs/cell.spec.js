import Vue from 'vue'
import Cell from 'components/cell'

describe('Cell component test', () => {
    it('normal', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<Cell arrow><p slot="content">Done</p><Cell>',
            components: {
                Cell
            }
        })

        expect(vm.$el.querySelector('p').textContent).to.equal('Done')
    })
})
