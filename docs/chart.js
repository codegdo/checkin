var CHART = (function(util, echarts, $) {
  var myChart = echarts.init($('[data-chart]'), null, {
    renderer: 'canvas',
    useDirtyRect: false
  });

  var dataTier = [{
    id: null,
    tier: 0,
    tierValue: '$0.00',
    value: 0
  }];

  var helper = {
    getValue: function() {},
    getTier: function() {}
  };

  var load = {
    option: function() {

      return {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '75%'],
            radius: '90%',
            min: 0,
            max: 1,
            splitNumber: tierLength * 2, // control the text
            axisLine: {
              lineStyle: {
                width: 25,
                color: tierColor
              }
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 20,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'inherit'
              }
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: '#ccc',
                width: 1
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: '#ccc',
                width: 2
              }
            },
            axisLabel: {
              color: '#464646',
              fontSize: 16,
              distance: -50,
              rotate: 'tangential',
              formatter: function (value) {
                return tierLabel(value);
              }
            },
            title: {
              offsetCenter: [0, '-10%'],
              fontSize: 20,
              fontWeight: 'bold'
            },
            detail: {
              //fontSize: 18,
              //fontWeight: 'bold',
              textStyle: {
                fontSize: 18,
                fontWeight: 'bold'
              },
              offsetCenter: [0, '-35%'],
              valueAnimation: true,
              formatter: function (value) {
                //return tierValue(value);
                return v;
              },
              color: 'inherit'
            },
            data: [
              {
                value: 0.5,
                name: 'Tier Goal'
              }
            ]
          }
        ]
      };
    }
  };
  var render = {
    chart: function(option) {
      var option = load.option();
    }
  };

  var chart = {
    init: function() {
      // load data tier array
      $('[data-tier]').each(function() {
        dataTier.push({
          id: $(this).data('field-id'),
          tier: $(this).data('tier'),
          tierValue: $(this).val(),
          value: formatNumber($(this).val()) || 0
        });
      });

      render.chart();
    }
  };

  return chart;
})(UTIL || {}, echarts || {}, jQuery);

var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});

var targetAttainmentField = $('[data-attainment-sale]');

var noneTier = {
  id: null,
  tier: 0,
  tierValue: '$0.00',
  value: 0
}

var fieldTiers = [noneTier];

$('[data-tier]').each(function() {
	fieldTiers.push({
  	id: $(this).data('field-id'),
    tier: $(this).data('tier'),
    tierValue: $(this).val(),
    value: formatNumber($(this).val()) || 0
  });
});

var attainmentSale = $(targetAttainmentField).val() || '$0.00';

var tierLength = fieldTiers.length;

var labels = generateLabels(tierLength);

var tierColor = generateColor(tierLength);

console.log(tierColor);
console.log(labels);



function tierLabel(value) {

	console.log('VALUE', value);
  
  return labels[value] || '';
}

function tierValue(value) {
	//return Math.round(value * 100) + '';
  return '$456,786';
}


var myoption = getOption(attainmentSale);

$(targetAttainmentField).on('change', function() {
	var val = $(this).val();
  
  var newoption = getOption(val);

  
  
  
  myChart.setOption(newoption);
  
  //window.chartRadar.resize();
  
});

renderChart(myoption);

window.addEventListener('resize', myChart.resize);

function getOption(v) {
	var option;

  option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: tierLength * 2, // control the text
        axisLine: {
          lineStyle: {
            width: 25,
            color: tierColor
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'inherit'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: '#ccc',
            width: 1
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: '#ccc',
            width: 2
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 16,
          distance: -50,
          rotate: 'tangential',
          formatter: function (value) {
            return tierLabel(value);
          }
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 20,
          fontWeight: 'bold'
        },
        detail: {
          //fontSize: 18,
          //fontWeight: 'bold',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          },
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value) {
            //return tierValue(value);
            return v;
          },
          color: 'inherit'
        },
        data: [
          {
            value: 0.5,
            name: 'Tier Goal'
          }
        ]
      }
    ]
  };
  return option;
}

function renderChart(option) {
	if (option && typeof option === 'object') {
    myChart.setOption(option);
  }
}


function generateColor(length) {
  const output = [];

  for (let i = 0; i < length; i++) {
    const value = (i + 1) / length;
    const color = getColor(value);
    output.push([value, color]);
  }

  return output;
}

function getColor(value) {
  const colors = ['#CCCCCC', '#FF6E76', '#FDDD60', '#58D9F9', '#7CFFB2'];
  const index = Math.floor(value * colors.length) - 1;
  return colors[index];
}

function generateLabels(length) {
  const output = {};
  const tiers = getTiers(length, 'tier');
  const keys = getKeys(length * 2);

  for (let i = 0; i < length; i++) {
    const tier = tiers[i];
    const key = keys[i];
    output[key] = tier;
  }

  return output;
}

function getTiers(length, label) {
  const tiers = [];

  for (let i = 0; i <= length; i++) {
    if(i === 0) {
    	tiers.push(``);
    } else {
    	tiers.push(`${label} ${i}`);
    }
  }

  return tiers;
}

function getKeys(length) {
  const output = [];

  for (let i = 0; i <= length; i++) {
    const value = i / length;
    output.push(parseFloat(value.toFixed(10)));
  }

  const result = output.filter((value, index) => index % 2 !== 0);

  return result;
}

function sortByTier(arr) {
  arr.sort((a, b) => a.tier - b.tier);
  const filteredList = arr.map(obj => obj.value);
  return filteredList;
}

function formatNumber(val) {
	return parseFloat(val.replace(/[^0-9\.-]/g, ''));
}

function normalizeTier(...items) {
  const squaredSum = items.reduce((sum, item) => sum + Math.pow(item, 2), 0);
  const oneHundred = Math.sqrt(squaredSum);

  const result = [];
  
  items.forEach((item, index) => {
    result.push(+(item / oneHundred).toFixed(2));
  });

  return result;
}

function getCurrentTier(value, thresholds) {
  const tier = thresholds.findIndex(threshold => value < threshold);
  return tier > 0 ? tier - 1 : 0;
}
