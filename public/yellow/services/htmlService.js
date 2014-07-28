/*
 * 
 *  Alternate for unsafe binding, enter html to return trusted html 
 * 
 */

yellow.factory('htmlService', function ($sce) {
    return {
        html: function (data) {
            returndata = $sce.trustAsHtml(data);
            return returndata;
        }
    }
});