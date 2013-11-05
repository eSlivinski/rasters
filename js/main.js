var data=[],
	corridorsExist = false,
	railsExist = false,
	metrosExist = false,
	labelsExist = false,
	riversExist = false,
	legendDesired = true,
	legendExist,
	states,
	selectedIndustryName,
	urbanAreas,
	metros,
	metroLabels,
	bounds = new L.LatLngBounds(new L.LatLng(49.36967206448725, -66.98702205598448), new L.LatLng(24.54234934005628, -124.70997774915149)).pad(.1),
	overlay_layer,
	clickedGeoID=[];
var mapboxURL= 'http://a.tiles.mapbox.com/v3/eslivi.{StyleID}/{z}/{x}/{y}.png';

var activeTiles = new L.LayerGroup;

var overlayTiles = new L.LayerGroup;
var metrosGroup = new L.LayerGroup;
var metroLabelsGroup = new L.LayerGroup;
var riverGroup = new L.LayerGroup;

var legend= L.control({position: 'bottomleft'}),
	buttons= L.control({position: 'topright'}),
	popup = new L.Popup({
		'closeButton':false
	});

			function progress(percent, $element, text) {
				var progressBarWidth = percent * $element.width() / 100;
				console.log(progressBarWidth)
				$element.find('.pbar').animate({ width: progressBarWidth }, 50).html(text);
			};




$(document).ready(function($){
	initMap();
	makeCountries();
	makeStates();
	

	legendExist=false;
	
	

	$('#manuChooser').modal();

	var choices = new L.LayerGroup([
		//food =  L.tileLayer.grayscale("http://a.tiles.mapbox.com/v3/eslivi.311_food/{z}/{x}/{y}.png",{name : "food", display : "Food"}),
		food =  new L.TileLayer(mapboxURL ,{StyleID: "311_food", name : "food", display : "Food", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Food"}),
		leather = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.316_leather/{z}/{x}/{y}.png", {name : "leather", display : "Leather and Allied Product", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Leather"}),
		wood = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.321_wood/{z}/{x}/{y}.png", {name : "wood", display : "Wood Product", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Wood"}),
		paper = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.322_paper/{z}/{x}/{y}.png", {name : "paper", display : "Paper", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Paper"}),
		printing = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.323_printing/{z}/{x}/{y}.png", {name : "printing", display : "Printing and Related Support Activies", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Printing"}),
		chemical = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.325_chemical/{z}/{x}/{y}.png", {name : "chemical", display : "Chemical", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Chemical"}),
		plastic = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.326_plastic/{z}/{x}/{y}.png", {name : "plastic", display : "Plastics and Rubber Products", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Plastic"}),
		nonmetalic = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.327_nonmetalic/{z}/{x}/{y}.png", {name : "nonmetalic", display : "Nonmetalic Mineral Product", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Nonmetalic"}),
		primary = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.331_primary/{z}/{x}/{y}.png", {name : "primary", display : "Primary Metal", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Primary Metals"}),
		fabricated = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.332_fabricated/{z}/{x}/{y}.png", {name : "fabricated", display : "Fabricated Metal Product", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Fabricated"}),
		machinery = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.333_machinery/{z}/{x}/{y}.png", {name : "machinery", display : "Machinery", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Machinery"}),
		computer = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.334_computer/{z}/{x}/{y}.png", {name : "computer", display : "Computer and Electronic Product", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Computer"}),
		electrical = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.335_electrical/{z}/{x}/{y}.png", {name : "electrical", display : "Electrical Equiptment, Appliance, and Component", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Electrical"}),
		transportation = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.336_transportation/{z}/{x}/{y}.png", {name : "transportation", display : "Transportation Equiptment", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Transportation"}),
		furniture = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.337_furniture/{z}/{x}/{y}.png", {name : "furniture", display : "Furniture and Related Product", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Furniture"}),
		misc = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.339_misc/{z}/{x}/{y}.png", {name : "misc", display : "Miscellaneous", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Miscellaneous"}),
		FG = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.FG/{z}/{x}/{y}.png", {name : "FG", display : "Freight Generators", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Freight Generators"}),
		WHDC = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.339_misc/{z}/{x}/{y}.png", {name : "WHDC", display : "Warehouses and Distribution Centers", attribution: "© Mid America Freight Coalition, 2013 | ESRI Business Analyst Data, 2012|Warehouses and Distribution Centers"}),
	])
	
	function makeStates(){
		$.getJSON('json/lower48.json', function (data) {
    		var input_geojson = topojson.object(data, data.objects.states);
    		for(i=0;i<input_geojson.geometries.length;i++) {
      			states.addData(input_geojson.geometries[i]);
      		};
      	});

      	states = L.geoJson(null, {
      		onEachFeature : function(feature, states) {
	      		states.setStyle({
	     			weight : mafcBold(feature.properties.postal),
					color : '#fff', 
					fillColor : '#fff',
					fillOpacity : 0,
					opacity : 1 
				});
	    	}
		}).addTo(map);


		function mafcBold(s){
			var MAFC = ['IL', 'IA', 'IN', 'MN','MI', 'WI', 'MO', 'KY', 'OH', 'KS']

			for (var i=0; i<10; i++){
			
				if (s==MAFC[i]){
					return 3;
				}
				
			};
		};
	};

	function makeCountries(){
		$.getJSON('json/canadaMex.json', function (data) {
			console.log(data)
    		var input_geojson = topojson.object(data, data.objects.countries);
    			for(i=0;i<input_geojson.geometries.length;i++) {
      				counties.addData(input_geojson.geometries[i]);
      			};
      		});

      	counties = L.geoJson(null, {
	    	onEachFeature : function(feature, counties) {
	     		counties.setStyle({
	      		weight : 0, 
				fillColor : '#000',
				fillOpacity : 1,
				opacity : 1 
				});
	    	}
		}).addTo(map);
	};

	$('#mapForm').change(function industryChange() {
	 	progress(0, $('.pbarbox'), ' ');

	 	

		var selectedIndustry = $('#mapForm option:selected').val();
		
		choices.eachLayer(function (layer) {
			if (layer.options.name == $('#mapForm option:selected').attr('id')){

				activeTiles.clearLayers();
				activeTiles.addLayer(layer);
				activeTiles.addTo(map);
				selectedIndustryName = layer.options.display
				
				
				if (railsExist==true){
					map.removeLayer(overlayTiles);
					overlayTiles.addTo(map);
				}
				progress(70, $('.pbarbox'), 'Loading Data...');

			}
			

		});

		$.getJSON('json/'+selectedIndustry+'.json', function (data) {
			var geoJSON = topojson.object(data, data.objects.counties);
			for ( i = 0; i < geoJSON.geometries.length; i++) {
				overlay_layer.addData(geoJSON.geometries[i])
			};

			
			progress(100, $('.pbarbox'), 'Finished!');
			setTimeout(function(){$('#manuChooser').modal('hide');}, 1000);
		});

		if (legendExist==false){
		 	makeLegend()
		 	//makeButtons()
			legendExist=true
			console.log('3')
		}else if (legendExist==true){
			removeLegend();
			makeLegend();
			console.log('3')
		};
		//progress(100, $('.pbarbox'), 'Building Map!');
		

		//setTimeOut($('#manuChooser').modal('hide'),)
		
	}); 

	$('#corridorsCheckbox').on("click", function(){
		if (corridorsExist==false){
			$.getJSON('json/corridors_vsnap_topo.json', function (data) {
				console.log(data)
    			var input_geojson = topojson.object(data, data.objects.corridors);
    			for(i=0;i<input_geojson.geometries.length;i++) {
      				corridors.addData(input_geojson.geometries[i]);
      			};
      		});

      		corridors = L.geoJson(null, {
	    		onEachFeature : function(feature, layer) {
	      			layer.setStyle({ 
	      				weight : 2,
						color : '#FF7817', 
						opacity : 1  
	      			});
	    		}
			}).addTo(map);
			corridorsExist=true;
			removeLegend();
			makeLegend();


			

		} else if (corridorsExist==true){
			map.removeLayer(corridors);
			corridorsExist=false;
			removeLegend();
			makeLegend();

		}
	})
	$('#railsCheckbox').on("click", function(){
		if (railsExist==false){
			var rails = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.rails/{z}/{x}/{y}.png");
			overlayTiles.addLayer(rails);
			railsExist=true
			removeLegend();
			makeLegend();
		} else if (railsExist==true){
			overlayTiles.clearLayers();
			railsExist=false
			removeLegend();
			makeLegend();
		}
	})
	$('#metrosCheckbox').on("click", function(){
		if (metrosExist==false){
			var metros = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.metroBorders/{z}/{x}/{y}.png");
	    	metrosGroup.addLayer(metros);
			metrosExist=true;
			removeLegend();
			makeLegend();
		} else if (metrosExist==true){
			metrosGroup.clearLayers();
			metrosExist=false;
			removeLegend();
			makeLegend();
		}
	})
	$('#labelsCheckbox').on("click", function(){
		if (labelsExist==false){
			var metroLabels = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.MetroLabelFinal/{z}/{x}/{y}.png");
	    	metroLabelsGroup.addLayer(metroLabels);
			labelsExist=true;
			removeLegend();
			makeLegend();
		} else if (labelsExist==true){
			metroLabelsGroup.clearLayers();
			labelsExist=false;
			removeLegend();
			makeLegend();
		}
	})
	$('#riversCheckbox').on("click", function(){
		if (riversExist==false){
			var metroLabels = new L.TileLayer("http://a.tiles.mapbox.com/v3/eslivi.roads/{z}/{x}/{y}.png");
	    	riverGroup.addLayer(metroLabels);
			riversExist=true;
			removeLegend();
			makeLegend();
		} else if (riversExist==true){
			riverGroup.clearLayers();
			riversExist=false;
			removeLegend();
			makeLegend();
		}
	})
	$('#optionsRadios1').on("click",function(){
		if(legendExist==false){
			makeLegend();
			legendExist=true;
		}
	})
	$('#optionsRadios2').on("click",function(){
		if(legendExist==true){
			removeLegend();
			legendExist=false;
		}
	})
	





	overlay_layer = L.geoJson(null, {
		onEachFeature : function(feature, layer) {
			layer.on({
        		mouseover: highlightFeature,
        		mouseout: resetHighlight,
        		click: popupMaker
        		
    		});

    		layer.off({
    			//click: console.log(e)
    
    		});

			layer.setStyle({
				opacity : 0, 
				fillOpacity : 0
			})



	

			function popupMaker(e){
				format = d3.format("0,000")
				m=e.target
				var selectedIndustry = $('#mapForm option:selected').val();
				console.log(m)

            	var bound = m.getBounds(),
            		north=bound.getNorthEast().lat,
            		middle=bound.getCenter().lng;

            	var popupContent = "<p class='countyName'><b>"+ m.feature.properties.NAMELSAD+"</p>"+
            		"<p>Sales Volume: </b>&nbsp$"+format(m.feature.properties.SALES_VOL)+
					"<br><b>Total Employment: </b>&nbsp"+format(m.feature.properties.NUMBER_EMP)+
					"<br><b>Business Count: </b>&nbsp"+m.feature.properties.Join_Count;;
				var popupOptions={
					'closeButton':false
				}
				


            	popup.setLatLng([north, middle]);
            	popup.setContent(popupContent);
            	map.openPopup(popup);
            	$('.leaflet-popup-content-wrapper').addClass('awesome');
            	//clickFeature();

			};
		
			function highlightFeature(e) {
				m = e.target;
				layer.setStyle({
					//weight: 4,
					fillOpacity: 0.4,
					color: '#fff'
				});

				if (!L.Browser.ie && !L.Browser.opera) {
					layer.bringToFront()
				};
						
			};
			// function clickFeature(e) {
			// 	m = e.target;
			// 	layer.setStyle({
			// 		//weight: 4,
			// 		fillOpacity: 1,
			// 		color: '#fff'
			// 	});

			// 	if (!L.Browser.ie && !L.Browser.opera) {
			// 		layer.bringToFront()
			// 	};
						
			// };

			function resetHighlight() {
				//if(feature.properties.CNTYIDFP!=clickedGeoID[clickedGeoID.length-1]){
					layer.setStyle({				
	    				opacity : 0, 
						fillOpacity : 0
					});
				//}
			};
				
			
		}
		//End of onEachFeature

		
	}).addTo(map);
	//End of Layer Deffinition



	function makeLegend(){
		
	
		legend.onAdd = function(map){
			var div = L.DomUtil.create ('div', 'info legend');

	
			div.innerHTML += '<p class="legendLabel">Manufacturing Employment Density:<br><b>'+selectedIndustryName+'</b></p>'
	
			div.innerHTML += '<br><p class="lLabel">High</p><div class="k" height="150 px" width = "29 px"</div><p class="lLabelBottom">Low</p>';
	
			if (railsExist==true){
					div.innerHTML += '<br><p class="legendLabel">Class 1 Rails<div class="background"><div class="rails"></div></div></p>'
			}if(corridorsExist==true){
					div.innerHTML += '<br><p class="legendLabel">Corridors</p><div class="background"><div class="corridors"></div></div>'
			}if(riversExist==true){
					div.innerHTML += '<br><p class=legendLabel>Rivers</p><div class="background"><div class="rivers"><p class="legendLabel"id="riverLabel">River Name</p></div></div>'
			}if(metrosExist==true){
				if(labelsExist==true){
						div.innerHTML += '<br><p class=legendLabel>Metros</p><div class="background"><div class="metros"><p class="legendLabel"id="metroLabel">Metro Name</p></div></div>'
						//$('#metroLabel').addClass('white');
				}else{
						div.innerHTML += '<br><p class=legendL>Metros</p><div class="background"><div class="metros"></div></div>'
				}
				
			}
	
			return div;
		}

	
		legend.addTo(map);
	}



	function removeLegend(){
		legend.removeFrom(map);
	}
	function makeButtons(){
		
	
		buttons.onAdd = function(map){
			var div = L.DomUtil.create ('div', 'info legend');
			
			div.innerHTML += '<button class= "btn btn-primary" id= "exportButton">EXPORT</button>'

	
			return div;
		}

	
		buttons.addTo(map);
	}
	//makeButtons();

	$('#exportButton').on('click', function(){
		console.log('hi')
	})


	function scaleMap() {
		$('#gMap').attr('transform', 'scale(' + 570/900 +')');
    	$('#svgMap').height(570*0.618);
    	$('#svgMap').css('height', $('#svgMap').height()*0.92);
    	$('#svgMap').css('width', 570);
  	}

  	resize();

});