Ext.define('CallFlowSencha.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                xtype: 'blog'
            },
            {
                xtype: 'contactform'
            },
            {
                xtype: 'homepanel'
            }
        ]
    }
});
