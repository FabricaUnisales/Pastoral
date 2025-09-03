import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../assets/logo.png';

export default function CarteirinhaMinima({ aluno, onCarteirinhaClick }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (aluno?.codigoCarteirinha) {
      QRCode.toDataURL(aluno.codigoCarteirinha, {
        width: 80,
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

  const baixarPDF = async () => {
    const elemento = document.getElementById(`carteirinha-${aluno.id}`);
    const canvas = await html2canvas(elemento, {
      scale: 3,
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
    <div 
      className="cursor-pointer hover:scale-105 transition-transform w-full max-w-[320px]"
      onClick={() => onCarteirinhaClick && onCarteirinhaClick(aluno)}
    >
      {/* Carteirinha */}
      <div 
        id={`carteirinha-${aluno.id}`}
        className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-4 text-white shadow-lg relative overflow-hidden w-full"
        style={{ height: '200px' }}
      >
        <div className="flex justify-between items-start h-full">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <img src={logo} alt="Logo" className="h-5 w-auto mr-2" />
              <div>
                <h3 className="text-xs font-bold">PASTORAL</h3>
                <p className="text-xs opacity-90">UniSales</p>
              </div>
            </div>
            
            <div className="space-y-1 text-xs">
              <div>
                <span className="font-semibold">Nome:</span>
                <p className="font-medium text-sm truncate" title={aluno.nome}>
                  {aluno.nome.length > 20 ? aluno.nome.substring(0, 20) + '...' : aluno.nome}
                </p>
              </div>
              <div>
                <span className="font-semibold">Série:</span> {aluno.serie}
              </div>
              <div>
                <span className="font-semibold">Escola:</span>
                <p className="truncate text-xs" title={aluno.escola}>
                  {aluno.escola.length > 18 ? aluno.escola.substring(0, 18) + '...' : aluno.escola}
                </p>
              </div>
              <div className="mt-2 pt-1 border-t border-blue-400">
                <span className="font-semibold">Código:</span> {aluno.codigoCarteirinha}
              </div>
            </div>
          </div>
          
          <div className="ml-3 text-center">
            {qrCodeUrl && (
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                className="w-16 h-16 bg-white p-1 rounded"
              />
            )}
            <p className="text-xs mt-1 opacity-90">QR Code</p>
          </div>
        </div>
      </div>

    </div>
  );
}
