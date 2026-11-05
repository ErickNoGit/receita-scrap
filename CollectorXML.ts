const url =
  "https://arquivos.receitafederal.gov.br/public.php/dav/files/YggdBLfdninEJX9/";

const response = await fetch(url, {
  method: "PROPFIND",
  headers: {
    Depth: "1",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/xml",
  },
  body: `<?xml version="1.0"?>
    <d:propfind xmlns:d="DAV:">
      <d:prop>
        <d:displayname/>
        <d:resourcetype/>
        <d:getlastmodified/>
      </d:prop>
    </d:propfind>`,
});

const xml = await response.text();

const CollectorXMLS = {
  link: url,
  content: xml,
};

export default CollectorXMLS;
