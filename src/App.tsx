import React, { useState } from 'react';
import { Copy, Check, Apple, Smartphone, Info, ExternalLink, QrCode, Bookmark, MousePointer2, ChevronRight } from 'lucide-react';

const BOOKMARKLET_CODE = `javascript:(function(){if(document.getElementById('qr-overlay-custom'))return;const links=document.querySelectorAll('a');let userId=null;const p1=/\\/sakanaquarium\\/([A-Za-z0-9_-]+)\\/friend/;const p2=/\\/sakanaquarium\\/photo\\/add\\/([A-Za-z0-9_-]+)/;for(let i=0;i<links.length;i++){if(links[i].href){let m=links[i].href.match(p1);if(m&&m[1]){userId=m[1];break;}m=links[i].href.match(p2);if(m&&m[1]){userId=m[1];break;}}}const overlay=document.createElement('div');overlay.id='qr-overlay-custom';overlay.style='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:999999;display:flex;justify-content:center;align-items:center;';let innerHtml='';if(!userId){innerHtml='<div style="background:#fff;padding:20px;border-radius:12px;text-align:center;max-width:85%;box-shadow:0 4px 12px rgba(0,0,0,0.3);box-sizing:border-box;"><h3 style="margin:0 0 10px;font-size:16px;color:#333;">エラー</h3><p style="font-size:14px;color:#666;margin:0 0 15px;">ユーザーIDが見つかりませんでした。</p><a href="https://kazutoto.github.io/SAKANACOMMUNITY-QRcode-Creater/" target="_blank" style="display:block;color:#007BFF;font-size:12px;margin-bottom:15px;word-break:break-all;">https://kazutoto.github.io/SAKANACOMMUNITY-QRcode-Creater/</a><button id="close-qr-btn" style="padding:10px 24px;background:#007BFF;color:#fff;border:none;border-radius:6px;font-size:16px;font-weight:bold;cursor:pointer;">閉じる</button></div>';}else{const profileUrl='https://sns.plusmember.jp/sakanaquarium/'+userId+'/mypage';const qrApiUrl='https://api.qrserver.com/v1/create-qr-code/?size=250x250&data='+encodeURIComponent(profileUrl);innerHtml='<div style="background:#fff;padding:20px;border-radius:12px;text-align:center;max-width:85%;box-shadow:0 4px 12px rgba(0,0,0,0.3);box-sizing:border-box;"><h3 style="margin:0 0 10px;font-size:16px;color:#333;">マイページのQRコード</h3><img src="'+qrApiUrl+'" style="width:200px;height:200px;display:block;margin:0 auto 10px;" /><p style="font-size:11px;color:#666;word-break:break-all;margin:0 0 15px;">'+profileUrl+'</p><button id="close-qr-btn" style="padding:10px 24px;background:#007BFF;color:#fff;border:none;border-radius:6px;font-size:16px;font-weight:bold;cursor:pointer;">閉じる</button></div>';}overlay.innerHTML=innerHtml;document.body.appendChild(overlay);document.getElementById('close-qr-btn').onclick=function(){overlay.remove();};})();`;

export default function App() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'iphone' | 'android'>('iphone');

  const handleCopy = () => {
    navigator.clipboard.writeText(BOOKMARKLET_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-6 h-6 text-blue-600" />
            <h1 className="font-bold text-lg text-gray-900">QR作成（SAKANACOMMUNITY)</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro */}
        <section className="bg-blue-50 border border-blue-100 rounded-xl p-5 sm:p-6 text-sm sm:text-base text-blue-900 leading-relaxed space-y-3">
          <p>
            SAKANACOMMUNITYで自分のページをshareするのがちょっと大変です。<br />
            そこで、簡単にQRコードを表示できるようにするブックマークレットを作りました。
          </p>
          <p>
            最初の登録方法がちょっと大変ですが、<br />
            登録が出来てしまえば、呼び出すのは簡単なのでお試しください。<br />
            以下、その登録手順と使い方の説明です。
          </p>
        </section>

        {/* Step 1: Copy Code */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</div>
            <h2 className="text-xl font-bold text-gray-900">コードをコピーする</h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base ml-10">
            以下のコードをコピーしてください。このコードをブックマークに登録して使います。
          </p>
          
          <div className="ml-10 relative bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-800">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-800/50">
              <span className="text-xs font-mono text-gray-400">bookmarklet.js</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'コピーしました' : 'コピー'}
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-xs sm:text-sm font-mono text-gray-300 whitespace-pre-wrap break-all leading-relaxed">
                {BOOKMARKLET_CODE}
              </pre>
            </div>
          </div>
        </section>

        {/* Step 2: Register */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</div>
            <h2 className="text-xl font-bold text-gray-900">ブックマークに登録する</h2>
          </div>
          
          <div className="ml-10 space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('iphone')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'iphone' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Apple className="w-4 h-4" />
                iPhone (Safari)
              </button>
              <button
                onClick={() => setActiveTab('android')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'android' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                Android (Chrome)
              </button>
            </div>

            {/* iPhone Instructions */}
            {activeTab === 'iphone' && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">このページをブックマークに追加します</p>
                      <p className="text-sm text-gray-500">画面下部の「共有（四角から矢印が飛び出たアイコン）」から「ブックマークを追加」をタップして保存します。</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">ブックマークを編集します</p>
                      <p className="text-sm text-gray-500">ブックマーク（本のアイコン）を開き、右下の「編集」をタップして、先ほど追加したブックマークを選択します。</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">名前とURLを変更して保存します</p>
                      <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-2 mt-2">
                        <div className="flex gap-2">
                          <span className="font-medium text-gray-700 w-12">名前：</span>
                          <span className="text-gray-900">そのまま（QR作成（SAKANACOMMUNITY)）でOKです</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-medium text-gray-700 w-12">URL：</span>
                          <span className="text-gray-900 break-all bg-yellow-100 px-1 rounded">※元々入っているURLを全て消して、先ほどコピーしたコードを貼り付けます</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            )}

            {/* Android Instructions */}
            {activeTab === 'android' && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">このページをブックマークに追加します</p>
                      <p className="text-sm text-gray-500">アドレスバー右側のメニュー（︙）から「☆」をタップしてブックマークします。</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">ブックマークを編集します</p>
                      <p className="text-sm text-gray-500">再度メニュー（︙）から「ブックマーク」を開き、追加した項目の右にあるメニュー（︙）から「編集」をタップします。</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">名前とURLを変更して保存します</p>
                      <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-2 mt-2">
                        <div className="flex gap-2">
                          <span className="font-medium text-gray-700 w-12">名前：</span>
                          <span className="text-gray-900">そのまま（QR作成（SAKANACOMMUNITY)）でOKです</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-medium text-gray-700 w-12">URL：</span>
                          <span className="text-gray-900 break-all bg-yellow-100 px-1 rounded">※元々入っているURLを全て消して、先ほどコピーしたコードを貼り付けます</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">戻るボタンなどで変更が保存されます。</p>
                    </div>
                  </li>
                </ol>
              </div>
            )}
          </div>
        </section>

        {/* Step 3: Usage */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</div>
            <h2 className="text-xl font-bold text-gray-900">使い方</h2>
          </div>

          <div className="ml-10 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-5 sm:p-6 space-y-6">
              
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">サカナコミュを開き、ログインします</p>
                  <a 
                    href="https://sns.emtg.jp/sakanaquarium/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    サカナコミュを開く
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                <div className="space-y-3">
                  <p className="font-medium text-gray-900">登録したブックマークレットを実行します</p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Apple className="w-4 h-4 text-gray-600" />
                        <span className="font-bold text-sm text-gray-700">iPhoneの場合</span>
                      </div>
                      <p className="text-sm text-gray-600">ブックマーク一覧（本のアイコン）を開き、登録した「QR作成（SAKANACOMMUNITY)」をタップします。</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Smartphone className="w-4 h-4 text-gray-600" />
                        <span className="font-bold text-sm text-gray-700">Androidの場合</span>
                      </div>
                      <p className="text-sm text-gray-600">アドレスバー（URLが表示されている場所）に「QR作成」などと入力し、候補に出てきたブックマークレットをタップします。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4" />
                </span>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">QRコードが表示されます！</p>
                  <p className="text-sm text-gray-500">画面の中央にあなたのマイページのQRコードが表示されます。フレンド追加などにご活用ください。</p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
