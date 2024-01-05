var doc = app.activeDocument;
var remoteAppName = app.name;
var version = app.version;

var directoryName = Folder.desktop + '/muestra/';
var translationsDirectoryName = directoryName + 'translations/';
var xmlFileName = app.activeDocument.name+'.xml';
var xml = '<?xml version="1.0" encoding="utf-8"?>';

var layers = app.activeDocument.layers;
// var textFrames = layers.getByName('Layer 1').textFrames;
var textFrames = app.activeDocument.textFrames;
createXML();
function createXML() {
    xml += '<SysfilterXML xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">';
    xml += '<SysfilterApplication>Sysfilter.Illustrator.Export 1.0.0.0</SysfilterApplication>';
    xml += '<RemoteApplicationName>' + remoteAppName + '</RemoteApplicationName>';
    xml += '<RemoteApplicationVersion>' + version + '</RemoteApplicationVersion>';
    xml += '<AIDocumentName>' + app.activeDocument.name + '</AIDocumentName>';
    for (var i=0; i<textFrames.length; i++) {
        var text = textFrames[i].contents;
        var parsedText = text.replace('’', "'");
        var textAttr = textFrames[i].textRange.characterAttributes;
        var paraAttr = textFrames[i].paragraphs[0].paragraphAttributes;
        xml += '<Textframes TFId="'+(i+1)+'" ColumnCount="'+textFrames[i].columnCount+'" Editable="'+textFrames[i].editable+'" Height="'+textFrames[i].height+'" Left="'+textFrames[i].left+'" Top="'+textFrames[i].top+'" Width="'+textFrames[i].width+'" TextframeTypeInfo="'+textFrames[i].typename+'" ParentLayerName="'+textFrames[i].parent.name+'" LayerName="'+textFrames[i].layer.name+'" LinesCount="'+textFrames[i].rowCount+'" ParagraphsCount="'+textFrames[i].columnCount+'" Name="'+textFrames[i].name+'" Note="'+textFrames[i].note+'">';
        xml += '<Paragraphs Number="1" AutoLeadingAmount="'+paraAttr.autoLeadingAmount+'" HyphenateCapitalizedWords="'+paraAttr.hyphenateCapitalizedWords+'" Hyphenation="'+paraAttr.hyphenation+'" HyphenationPreference="'+paraAttr.hyphenationPreference+'" HyphenationZone="'+paraAttr.hyphenationZone+'" KinsokuOrder="'+paraAttr.kinsokuOrder+'" KurikaeshiMojiShori="'+paraAttr.kurikaeshiMojiShori+'" LeftIndent="'+paraAttr.leftIndent+'" MaximumConsecutiveHyphens="'+paraAttr.maximumConsecutiveHyphens+'" MaximumGlyphScaling="'+paraAttr.maximumGlyphScaling+'" MaximumLetterSpacing="'+paraAttr.maximumLetterSpacing+'" MaximumWordSpacing="'+paraAttr.maximumWordSpacing+'" MinimumAfterHyphen="'+paraAttr.minimumAfterHyphen+'" MinimumBeforeHyphen="'+paraAttr.minimumBeforeHyphen+'" MinimumGlyphScaling="'+paraAttr.minimumGlyphScaling+'" MinimumHyphenatedWordSize="'+paraAttr.minimumHyphenatedWordSize+'" MinimumLetterSpacing="'+paraAttr.minimumLetterSpacing+'" MinimumWordSpacing="'+paraAttr.minimumWordSpacing+'" RightIndent="'+paraAttr.rightIndent+'" RomanHanging="'+paraAttr.romanHanging+'" SpaceAfter="'+paraAttr.spaceAfter+'" SpaceBefore="'+paraAttr.spaceBefore+'">';
        xml += '<CharacterAttributes BaselineDirection="'+textAttr.baselineDirection.toString()+'" BaselinePosition="'+textAttr.baselinePosition.toString()+'" BaselineShift="'+textAttr.baselineShift+'" Textfontname="'+textAttr.textFont.name+'" FontSize="'+textAttr.size+'" AkiLeft="'+textAttr.akiLeft+'" AkiRight="'+textAttr.akiRight+'" ContextualLigature="'+textAttr.contextualLigature+'" DiscretionaryLigature="'+textAttr.discretionaryLigature+'" FigureStyle="'+textAttr.figureStyle.toString()+'" OpenTypePosition="'+textAttr.openTypePosition.toString()+'" Alignment="'+textAttr.alignment.toString()+'" AlternateGlyphs="'+textAttr.alternateGlyphs.toString()+'" AutoLeading="'+textAttr.autoLeading+'" Capitalization="'+textAttr.capitalization.toString()+'" HorizontalScale="'+textAttr.horizontalScale+'" Italics="'+textAttr.italics+'" KerningMethod="'+textAttr.kerningMethod.toString()+'" Language="'+textAttr.language.toString()+'" Leading="'+textAttr.leading+'" Ligature="'+textAttr.ligature+'" NoBreak="'+textAttr.noBreak+'" OverprintFill="'+textAttr.overprintFill+'" OverprintStroke="'+textAttr.overprintStroke+'" Rotation="'+textAttr.rotation+'" Strikethrough="'+textAttr.strikeThrough+'" StrokeWeight="'+textAttr.strokeWeight+'" Tracking="'+textAttr.tracking+'" Underline="'+textAttr.underline+'" VerticalScale="'+textAttr.verticalScale+'" FillColorType="'+textAttr.fillColor.typename+'" FontColorGray="0" FontColorRGBRed="0" FontColorRGBBlue="0" FontColorRGBGreen="0" FontColorLabA="0" FontColorLabB="0" FontColorLabL="0" FontColorCMYKBLack="'+textAttr.fillColor.black+'" FontColorCMYKCyan="'+textAttr.fillColor.cyan+'" FontColorCMYKMagenta="'+textAttr.fillColor.magenta+'" FontColorCMYKYellow="'+textAttr.fillColor.yellow+'">';
        xml += '<Text>' + parsedText + '</Text>';
        xml += '</CharacterAttributes>';
        xml += '</Paragraphs>';
        xml += '</Textframes>';
    }

    xml += '<ExportSettingExportOnlyFromLayer>false</ExportSettingExportOnlyFromLayer>';
    xml += '<ExportSettingLayerName>English</ExportSettingLayerName>';
    xml += '<ExportSettingEditableText>false</ExportSettingEditableText>';
    xml += '<ExportSettingTypeTextOnly>false</ExportSettingTypeTextOnly>';
    xml += '</SysfilterXML>';
}

var xmlfile = File(directoryName+xmlFileName);
if (!xmlfile.exists) {
    $.writeln('xml file does not exist. Creating new one');
    xmlfile = new File(directoryName+xmlFileName);
}
xmlfile.open('w');
xmlfile.write(new XML(xml));
xmlfile.close();

// existXML();
// function existXML() {
//     var f = Folder(translationsDirectoryName);
//     var allFiles = f.getFiles();
//     for (var i = 0; i < allFiles.length; i++) {
//         thisFile = allFiles[i].name;
//         if (thisFile==xmlFileName) {
//             importXML();
//         }
//     }
// }
// function importXML() {
//     $.writeln(translationsDirectoryName+xmlFileName);
//     var xmlFile = File(translationsDirectoryName+xmlFileName);
//     xmlFile.open("r");
//     var xmlString = xmlFile.read();
//     var xmlData = new XML(xmlFile.read());
//     xmlFile.close();
//     $.writeln(xmlData);
// }