Ext.define('CallFlowSencha.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            blogList: 'blog list',
            blog: 'blog'
        },
        control: {
            'blog list': {
                itemtap: 'showPost'
            }
        }
    },

    showPost: function( list, index, element, record ){
        console.log( record.get('title') );
        this.getBlog().push({
            xtype: 'panel',
            title: record.get( 'title' ),
            html: record.get( 'content' ),
            styleHtmlContent: true,
            scrollable: true
        });

    }
});