export interface XMLResult {
  link: URL;
  content: string;
}

const DEFAULT_URL =
  "https://arquivos.receitafederal.gov.br/public.php/dav/files/YggdBLfdninEJX9/";

const BODY = `<?xml version="1.0"?>
<d:propfind xmlns:d="DAV:">
  <d:prop>
    <d:displayname/>
    <d:resourcetype/>
    <d:getlastmodified/>
    <d:getcontentlength/>
  </d:prop>
</d:propfind>`;

class CallXML {
  private url: string;

  constructor(link?: string) {
    this.url = link ?? DEFAULT_URL;
  }

  async request(): Promise<XMLResult> {
    const response = await fetch(this.url, {
      method: "PROPFIND",
      headers: {
        Depth: "1",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/xml",
      },
      body: BODY,
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return { link: new URL(this.url), content: await response.text() };
  }
}

export default CallXML;