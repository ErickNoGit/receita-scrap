import CollectorXML from "./CollectorXML.ts";

const ContentXML: string = await Bun.file(CollectorXML.content).text();
const XMLParser = Bun.XML.parse(ContentXML);

const JsonDatas: any = JSON.stringify(XMLParser, null, 2);

const FileXMLParser = "./parseer_json.json";
Bun.write(FileXMLParser, JsonDatas);
