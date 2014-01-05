(function() {
        // Load plugin specific language pack
        //tinymce.PluginManager.requireLangPack('example');

        tinymce.create('tinymce.plugins.ChemSlatePlugin', {
                /**
                   * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
                 * @param {string} url Absolute URL to where the plugin is located.
                 */
                init : function(ed, url) {
                        // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
            lang = tinyMCE.activeEditor.getParam('language');
                        ed.addCommand('chemSlate', function() {

                                ed.windowManager.open({
                                        file : ed.getParam("moodle_plugin_base") + '/chemslate/chemslate.php?lang=' + lang,
                                        width : 400,
                                        height : 400,
                                        inline : 1
                                }, {
                                        plugin_url : url, // Plugin absolute URL
                                        math: {mathml: "<math></math>"}
                                });
                        });

                        // Register button
                        ed.addButton('chemslate', {
                                title : 'ChemSlate',
                                cmd : 'chemSlate',
                                image : url + '/img/chemslate.png'
                        });
                        // Add a node change handler, selects the button in the UI when a image is selected
                        ed.onNodeChange.add(function(ed, cm, n) {
                                cm.setActive('chemSlate', n.nodeName == 'IMG');
                        });
                },

               
                /**
                 * @return {Object} Name/value array containing information about the plugin.
                 */
                getInfo : function() {
                        return {
                                longname : 'ChemSlate',
                                author : 'Geoffrey Rowland',
                                authorurl : 'rowland.geoff@gmail.com',
                                infourl : 'rowland.geoff@gmail.com',
                                version : "0.1"
                        };
                }
        });

        // Register plugin
        tinymce.PluginManager.add('chemslate', tinymce.plugins.ChemSlatePlugin);
})();
