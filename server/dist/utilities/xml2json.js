"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xmlToJson = void 0;
const { DOMParser } = require('@xmldom/xmldom');
async function xmlToJson(xml) {
    "use strict";
    function getAttributes(node) {
        let a = {};
        for (let x = 0; x < node.attributes.length; x++) {
            a[node.attributes[x].name] = node.attributes[x].value;
        }
        return a;
    }
    function getJSON(xmlparsed) {
        if (!xmlparsed.children.length) {
            if (xmlparsed.attributes.length)
                return {
                    attributes: getAttributes(xmlparsed),
                    text: xmlparsed.textContent,
                };
            return { text: xmlparsed.textContent };
        }
        let q = {};
        if (xmlparsed.attributes.length)
            q["attributes"] = getAttributes(xmlparsed);
        for (let x = 0; x < xmlparsed.children.length; x++) {
            if (!q.hasOwnProperty(xmlparsed.children[x].tagName))
                q[xmlparsed.children[x].tagName] = getJSON(xmlparsed.children[x]);
            else if (Array.isArray(q[xmlparsed.children[x].tagName]))
                q[xmlparsed.children[x].tagName] = [
                    ...q[xmlparsed.children[x].tagName],
                    getJSON(xmlparsed.children[x]),
                ];
            else
                q[xmlparsed.children[x].tagName] = [
                    q[xmlparsed.children[x].tagName],
                    getJSON(xmlparsed.children[x]),
                ];
        }
        return q;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    let json = {};
    if (doc.xmlVersion || doc.xmlEncoding)
        json["attributes"] = {};
    if (doc.xmlVersion)
        json["attributes"]["version"] = doc.xmlVersion;
    if (doc.xmlEncoding)
        json["attributes"]["encoding"] = doc.xmlEncoding;
    json[doc.children[0].tagName] = getJSON(doc.children[0]);
    return json;
}
exports.xmlToJson = xmlToJson;
//# sourceMappingURL=xml2json.js.map