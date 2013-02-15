Ext.define( 'CallFlowSencha.view.Contact', {
    extend: 'Ext.form.Panel',
    xtype: 'contactform',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Email'
    ],

    config: {
        title: 'Contact',
        iconCls: 'user',
        url: 'some_page',


        items: [
            {
                xtype: 'fieldset',
                title: 'Contact us',
                instructions: '(email is not required)',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        label: 'Name',
                        required: true
                    },
                    {
                        xtype: 'emailfield',
                        name: 'email',
                        label: 'Email'
                    },
                    {
                        xtype: 'textareafield',
                        name: 'message',
                        label: 'Message'
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'Send',
                ui: 'confirm',
                handler: function(){
                    this.up( 'contactform' ).submit();
                }
            }
        ]
    }
});