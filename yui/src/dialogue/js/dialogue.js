// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * TinyMCE text editor chemslate plugin.
 *
 * @package    editor-tinymce
 * @subpackage chemslate
 * @copyright  2014 Geoffrey Rowland <rowland.geoff@gmail.com>
 * modified    from MathSlate @copyright  2013 Daniel Thies <dthies@ccal.edu>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
M.tinymce_chemslate = M.tinymce_chemslate || {};
M.tinymce_chemslate={
    /**
     * The window used to hold the editor.
     *
     * @property dialogue
     * @type M.core.dialogue
     * @default null
     */
    dialogue : null,

    /**
     * The selection object returned by the browser.
     *
     * @property selection
     * @type Range
     * @default null
     */
    selection : null,

    /**
     * The configuration json string for math tools.
     *
     * @property config
     * @type Range
     * @default null
     */

    config: null,

    /**
     * Add this button to the form.
     *
     * @method init
     * @param {Object} params
     */

    init : function(params) {
        M.tinymce_chemslate.config=params.config||M.local_chemslate.config;
        var dialogue = Y.one('#'+params.elementid);
        
        var editorID=Y.guid();
        dialogue.append('<div id="'+editorID+'" ></div>');
        var me=new M.local_mathslate.Editor('#'+editorID,M.tinymce_chemslate.config);
        var cancel=Y.one('#'+editorID).appendChild(Y.Node.create('<button>Cancel</button>'));
        var displayTex=Y.one('#'+editorID).appendChild(Y.Node.create('<button>Display TeX</button>'));
        var inlineTex=Y.one('#'+editorID).appendChild(Y.Node.create('<button>Inline TeX</button>'));

        displayTex.on('click',function(){
            tinyMCEPopup.editor.execCommand('mceInsertContent', false,  '\\[\\ce{'+me.output('tex')+'}\\]');
            tinyMCEPopup.close();
            });
        inlineTex.on('click',function(){
            tinyMCEPopup.editor.execCommand('mceInsertContent', false,  '\\(\\ce{'+me.output('tex')+'}\\)');
            tinyMCEPopup.close();
            });
        cancel.on('click',function(){
            tinyMCEPopup.close();
            });
            
        MathJax.Hub.Queue(['Typeset',MathJax.Hub,me.node.generateID()]);

        M.tinymce_chemslate.dialogue = dialogue;
        
    }

};
