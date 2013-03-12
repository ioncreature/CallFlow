/**
 * @author Marenin Alexander
 * February 2013
 */

enyo.kind({
    kind: 'Control',
    name: 'rc.UserInfo',
    classes: 'ui-user-info',

    published: {
        avatarUrl: '',
        data: null
    },

    components: [
        {classes: 'ui-user-info-left', components: [
            {name: 'avatar', tag: 'img', content: ''}
        ]},
        {classes: 'ui-user-info-right', components: [
            {name: 'name', classes: 'ui-user-info-name'},
            {name: 'extension', classes: 'ui-user-info-extension'},
            {name: 'company', classes: 'ui-user-info-company'},
            {name: 'post', classes: 'ui-user-info-post'},
            {name: 'email', classes: 'ui-user-info-email'}
        ]},
        {classes: 'ui-icon-next'}
    ],

    create: function(){
        this.inherited( arguments );
        this.avatarUrlChanged();
        this.dataChanged();
    },

    avatarUrlChanged: function(){
        var url = this.getAvatarUrl();
        if ( url )
            this.$.avatar.setAttribute( 'src', url );
        else
            this.$.avatar.hide();
    },

    dataChanged: function(){
        var data = this.getData(),
            dObj;

        if ( !data )
            dObj = {
                name: 'ololo',
                extension: 'ololo',
                company: 'ololo',
                post: 'ololo',
                email: 'ololo'
            };
        else
            dObj = data;

        this.$.name.setContent( dObj.name );
        this.$.extension.setContent( dObj.extension );
        this.$.company.setContent( dObj.company );
        this.$.post.setContent( dObj.post );
        this.$.email.setContent( dObj.email );
    }
});