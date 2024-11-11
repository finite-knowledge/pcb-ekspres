import React from "react";

const Documentation = () => {
  const generateGDPRRequest = () => {
    const content = `
      GDPR Request Form:

      Name: ____________________
      Email: ____________________
      Request Type: [Delete Data / Access Data / Update Data]
      Reason for Request: __________________________
      Signature: _____________________
      Date: _____________________
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "GDPR_Request_Form.txt";
    link.click();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Документација</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Импортрање на Gerber Фајлови
          </h2>
          <p className="text-gray-700 mb-4">
            За да го импортраите вашиот дизјан на плочка, потребно е да крирате
            архива фајл (.zip) кои ќе ги содржи неопходните фајлови, Фајлот
            архива потребно да изгеда како примерот долу:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Горниот Слој Gerber:</strong>
              <ul className="list-disc list-inside text-gray-700">
                <li>Top Copper (.gtl or .gto)</li>
                <li>Top Soldermask (.gts or .gto)</li>
                <li>Top Silkscreen (.gto or .gts)</li>
              </ul>
            </li>
            <li>
              <strong>Долниот Слој Gerber:</strong>
              <ul className="list-disc list-inside text-gray-700">
                <li>Bottom Copper (.gbl or .gbo)</li>
                <li>Bottom Soldermask (.gbs or .gbo)</li>
                <li>Bottom Silkscreen (.gbo or .gbs)</li>
              </ul>
            </li>
            <li>
              <strong>Drill Фајлови:</strong>
              <ul className="list-disc list-inside text-gray-700">
                <li>Drill File (.drl)</li>
              </ul>
            </li>
            <li>
              <strong>Други Фајлови:</strong>
              <ul className="list-disc list-inside text-gray-700">
                <li>Board Outline (.gko or .gm1)</li>
                <li>NC Drill File (.txt)</li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Uploading Zip Files</h2>
          <p className="text-gray-700 mb-4">
            За да го прикачите zip фајлот на нашата страна:
          </p>
          <ol className="list-decimal list-inside text-gray-700 mb-4">
            <li>Притиснете на копчето Понуда</li>
            <li>Притиснете на "Upload File" копчето.</li>
            <li>
              Одберете ја zip архивата од вашиот компјутер (со гербер
              фајловите).
            </li>
            <li>Притиснете "Open" за да ги прикачите фајловите.</li>
          </ol>
          <p className="text-gray-700 mb-4">
            Доколку имате проблем или прашање слободно пратете mail:
            contact@pcbekspres.mk
          </p>
        </div>
      </div>

      {/* Download GDPR Request Form Button */}
      <div className="mt-8">
        <button
          onClick={generateGDPRRequest}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Превземи GDPR Барање
        </button>
      </div>
    </div>
  );
};

export default Documentation;
