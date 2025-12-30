Chart.defaults.font.family =
  '-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.font.weight = '500';

const monthly = 100000;
const months = 30;

const labels = [
  '23/7','23/10','24/1','24/4','24/7',
  '24/10','25/1','25/4','25/7','25/10','25/12'
];

const principalValues = [];
for (let i = 1; i <= labels.length; i++) {
  principalValues.push(monthly * 3 * i);
}
principalValues[principalValues.length - 1] = monthly * months;

const assetValues = [
   300000,  600000,  900000, 1200000, 1500000,
  1800000, 2100000, 2400000, 2700000, 2950000, 3091500
];

const latestAsset = assetValues.at(-1);
const principal = monthly * months;
const profit = latestAsset - principal;
const returnRate = (profit / principal) * 100;

document.getElementById('totalAsset').innerHTML =
  latestAsset.toLocaleString() + '<span>円</span>';

const profitEl = document.getElementById('profit');
profitEl.innerHTML =
  (profit >= 0 ? '+' : '') + profit.toLocaleString() + '<span>円</span>';
profitEl.style.color = profit >= 0 ? '#1a7f37' : '#b00020';

document.getElementById('returnRate').innerHTML =
  returnRate.toFixed(2) + '<span>%</span>';

const ctx = document.getElementById('assetChart');
new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: '評価額',
        data: assetValues,
        borderColor: '#1a7f37',
        backgroundColor: 'rgba(26,127,55,0.15)',
        tension: 0.3,
        fill: true,
        pointRadius: 0
      },
      {
        label: '拠出累計',
        data: principalValues,
        borderColor: '#888',
        borderDash: [6,6],
        tension: 0,
        fill: false,
        pointRadius: 0
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { boxWidth:12, color:'#666' } }
    },
    scales: {
      x: { grid:{display:false}, ticks:{color:'#666'} },
      y: {
        min:0,
        max:3200000,
        ticks:{stepSize:500000, callback:v => (v/10000)+'万円'},
        grid:{color:'#e5e5e5', drawBorder:false}
      }
    }
  }
});
