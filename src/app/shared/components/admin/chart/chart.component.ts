import { Component, Input, OnChanges } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges {
	@Input() chartType:
		| 'line'
		| 'bar'
		| 'pie'
		| 'scatter'
		| 'radar' = 'bar';
	@Input() chartData: any[] = [];
	@Input() chartCategories: string[] = [];
	@Input() chartTitle: string = '';
	@Input() height: string = '400px';
	@Input() width: string = '100%';

	chartOption: EChartsOption = {};

	ngOnChanges() {
		this.updateChart();
	}

	private updateChart() {
		switch (this.chartType) {
			case 'line':
				this.chartOption = this.getLineChartOption();
				break;
			case 'bar':
				this.chartOption = this.getBarChartOption();
				break;
			case 'pie':
				this.chartOption = this.getPieChartOption();
				break;
			case 'radar':
				this.chartOption = this.getRadarChartOption();
				break;
			default:
				this.chartOption = this.getBarChartOption();
		}
	}

	private getBarChartOption(): EChartsOption {
		return {
			title: {
				text: this.chartTitle,
				left: 'center',
				textStyle: {
					color: '#333',
					fontSize: 16,
					fontWeight: 'bold',
				},
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: { type: 'shadow' },
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			},
			xAxis: {
				type: 'category',
				data: this.chartCategories,
				axisLine: {
					lineStyle: {
						color: '#333',
					},
				},
				axisLabel: {
					color: '#333',
				},
			},
			yAxis: {
				type: 'value',
				axisLine: {
					lineStyle: {
						color: '#333',
					},
				},
				axisLabel: {
					color: '#333',
				},
				splitLine: {
					lineStyle: {
						color: 'rgba(0, 0, 0, 0.05)',
					},
				},
			},
			series: [
				{
					name: 'Data',
					type: 'bar',
					data: this.chartData,
					itemStyle: {
						color: new echarts.graphic.LinearGradient(
							0,
							0,
							0,
							1,
							[
								{ offset: 0, color: 'rgba(0, 0, 0, 0.8)' },
								{ offset: 1, color: 'rgba(0, 0, 0, 0.1)' },
							]
						),
					},
				},
			],
		};
	}

	private getLineChartOption(): EChartsOption {
		return {
			title: {
				text: this.chartTitle,
				left: 'center',
				textStyle: {
					color: '#333',
					fontSize: 16,
					fontWeight: 'bold',
				},
			},
			tooltip: {
				trigger: 'axis',
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: this.chartCategories,
				axisLine: {
					lineStyle: {
						color: '#333',
					},
				},
				axisLabel: {
					color: '#333',
				},
			},
			yAxis: {
				type: 'value',
				axisLine: {
					lineStyle: {
						color: '#333',
					},
				},
				axisLabel: {
					color: '#333',
				},
				splitLine: {
					lineStyle: {
						color: 'rgba(0, 0, 0, 0.05)',
					},
				},
			},
			series: [
				{
					name: 'Data',
					type: 'line',
					data: this.chartData,
					symbol: 'circle',
					symbolSize: 8,
					itemStyle: {
						color: '#000',
						borderColor: '#fff',
						borderWidth: 2,
					},
					lineStyle: {
						width: 3,
						color: '#000',
					},
					areaStyle: {
						color: new echarts.graphic.LinearGradient(
							0,
							0,
							0,
							1,
							[
								{ offset: 0, color: 'rgba(0, 0, 0, 0.3)' },
								{ offset: 1, color: 'rgba(0, 0, 0, 0.1)' },
							]
						),
					},
				},
			],
		};
	}

	private getPieChartOption(): EChartsOption {
		return {
			title: {
				text: this.chartTitle,
				left: 'center',
				textStyle: {
					color: '#333',
					fontSize: 16,
					fontWeight: 'bold',
				},
			},
			tooltip: {
				trigger: 'item',
			},
			series: [
				{
					name: 'Data',
					type: 'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2,
					},
					label: {
						show: false,
						position: 'center',
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '18',
							fontWeight: 'bold',
							color: '#333',
						},
					},
					labelLine: {
						show: false,
					},
					data: this.chartData.map((value, index) => ({
						value,
						name: this.chartCategories[index],
						itemStyle: {
							color: `rgba(0, 0, 0, ${
								0.1 + (0.7 * index) / this.chartData.length
							})`,
						},
					})),
				},
			],
		};
	}

	private getRadarChartOption(): EChartsOption {
		return {
			title: {
				text: this.chartTitle,
				left: 'center',
				textStyle: {
					color: '#333',
					fontSize: 16,
					fontWeight: 'bold',
				},
			},
			tooltip: {},
			radar: {
				indicator: this.chartCategories.map((name) => ({
					name,
					max: Math.max(...this.chartData) * 1.2,
				})),
				axisName: {
					color: '#333',
				},
				splitLine: {
					lineStyle: {
						color: 'rgba(0, 0, 0, 0.1)',
					},
				},
				splitArea: {
					show: false,
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(0, 0, 0, 0.2)',
					},
				},
			},
			series: [
				{
					name: 'Data',
					type: 'radar',
					data: [
						{
							value: this.chartData,
							name: 'Series',
							areaStyle: {
								color: 'rgba(0, 0, 0, 0.2)',
							},
							lineStyle: {
								width: 2,
								color: '#000',
							},
							symbolSize: 6,
							itemStyle: {
								color: '#000',
							},
						},
					],
				},
			],
		};
	}
}
