/*
 * Service to generate NgDialogs (Abstraction over abstraction lol) 
 * 
 * 
 * .dialogPlain - returns plain dialog , takes
 *              1. template data
 *              2. boolean to close all previous dialogs
 *              3. Controller name
 * 
 *  .closeall - closes all previous dialogs
 * 
 * 
 */

yellow.factory('dialogService', function (ngDialog) {
    return {
        dialogPlain: function (data, closeprev,Ctrl) {
            if (closeprev) {
                ngDialog.closeAll();
            }
            ngDialog.open({
                template: data,
                plain: true,
                closeByEscape: true,
                controller: Ctrl
            });
        },

        closeAll: function () {
            ngDialog.closeAll();
        }
    };
});