import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../assets/logo.png';

export default function Carteirinha({ aluno, onClose }) {
  const carteirinhaRef = useRef();
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (aluno?.codigoCarteirinha) {
      QRCode.toDataURL(aluno.codigoCarteirinha, {
        width: 120,
        margin: 1,
        color: {
          dark: '#1e3a8a',
          light: '#ffffff'
        }
      }).then(url => {
        setQrCodeUrl(url);
      });
    }
  }, [aluno]);

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const baixarPDF = async () => {
    const elemento = carteirinhaRef.current;
    const canvas = await html2canvas(elemento, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Dimensões da carteirinha em mm (tamanho cartão de crédito aproximado)
    const carteirinhaWidth = 85.6;
    const carteirinhaHeight = 53.98;
    
    // Centralizar na página
    const x = (pdf.internal.pageSize.getWidth() - carteirinhaWidth) / 2;
    const y = (pdf.internal.pageSize.getHeight() - carteirinhaHeight) / 2;
    
    pdf.addImage(imgData, 'PNG', x, y, carteirinhaWidth, carteirinhaHeight);
    pdf.save(`carteirinha_${aluno.nome.replace(/\s+/g, '_')}.pdf`);
  };

  if (!aluno) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">Carteirinha do Aluno</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Carteirinha */}
        <div 
          ref={carteirinhaRef}
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-4 text-white shadow-lg"
          style={{ width: '320px', height: '200px' }}
        >
          <div className="flex justify-between items-start h-full">
            <div className="flex-1">
                             <div className="flex items-center mb-2">
                 <img src={logo} alt="Logo" className="h-6 w-auto mr-2" />
                 <div>
                   <h3 className="text-sm font-bold">PASTORAL</h3>
                   <p className="text-xs opacity-90">UniSales</p>
                 </div>
               </div>
              
              <div className="space-y-1 text-xs">
                <div>
                  <span className="font-semibold">Nome:</span>
                  <p className="font-medium text-sm">{aluno.nome}</p>
                </div>
                                 <div>
                   <span className="font-semibold">Série:</span> {aluno.serie}
                 </div>
                <div>
                  <span className="font-semibold">Escola:</span> {aluno.escola}
                </div>
                <div className="mt-2 pt-1 border-t border-blue-400">
                  <span className="font-semibold">Código:</span> {aluno.codigoCarteirinha}
                </div>
              </div>
            </div>
            
            <div className="ml-4 text-center">
              {qrCodeUrl && (
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="w-20 h-20 bg-white p-1 rounded"
                />
              )}
              <p className="text-xs mt-1 opacity-90">Escaneie o QR</p>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={baixarPDF}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            📄 Baixar PDF
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
