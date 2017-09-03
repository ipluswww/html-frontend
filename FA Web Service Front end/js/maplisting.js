var markerCluster = null;
function listingMap( mapdataar, maximumzoom ) {
	maximumzoom = maximumzoom || 22;
	
    //mapupdate
    google.maps.visualRefresh = true;
    //alert (mapdataar[0].lat);

    //delete old marker
    if ( markerCluster !== null ) {
        markerCluster.clearMarkers();
        for ( var i in this.markers ) {
            var marker = this.markers[i];

            if ( marker.infoWindowOpen === true ) {
                marker.infoWindow.close();
            }
        }
    }

    //map div and create blank map and auto resize
    var mapElement = $( '#map' );
        var mapWidth = parseInt( mapElement.width() )
		var mapHeight = parseInt( window.innerHeight ) - 100;
		//mapElement.css("height", mapHeight, "width", mapWidth);
		var location = new google.maps.LatLng( 0, 0 );

		var mapOptions = {
			zoom				: 2,
			maxZoom				: maximumzoom,
			center				: location,
			mapTypeId			: google.maps.MapTypeId.ROADMAP,
			streetViewControl	: true,
			scrollwheel			: false
		};

		var listingmap = new google.maps.Map( mapElement[0], mapOptions );
		//google.maps.event.trigger( listingmap, 'resize' );

		//add marker
		var markers = [];
		for (i = 0; i < mapdataar.length; i++) {
			var location = new google.maps.LatLng( mapdataar[i].lat, mapdataar[i].lon );
			var marker = new google.maps.Marker({
				//map				: listingmap,
				//draggable		: false,
				flat			: true,
				position		: location,
				icon			: bkfolder + 'images/map-marker1.png'
			});

			marker.im = mapdataar[i].contentval;
			markers.push(marker);
			marker.infoWindow = null;
		}

		//Cluster option
		mcOptions		= {
			averageCenter	: true,
			gridSize	: 50,
			maxZoom		: 15,
			styles			: [{
				'textColor'	: 'white',
				'width'		: 36,
				'height'	: 36,
				'url'		: bkfolder + 'images/map-marker1.png',
				'textSize'	: 13,
				'fontFamily': "Arial"
			},
			{
				'textColor'	: 'white',
				'width'		: 40,
				'height'	: 40,
				'url'		: bkfolder + 'images/map-marker1.png',
				'textSize'	: 13,
				'fontFamily': "Helvetica, Arial, sans-serif"
			},
			{
				'textColor'	: 'white',
				'width'		: 44,
				'height'	: 44,
				'url'		: bkfolder + 'images/map-marker1.png',
				'textSize'	: 13,
				'fontFamily': "Helvetica, Arial, sans-serif"
			},
			{
				'textColor'	: 'white',
				'width'		: 48,
				'height'	: 48,
				'url'		: bkfolder + 'images/map-marker1.png',
				'textSize'	: 13,
				'fontFamily': "Helvetica, Arial, sans-serif"
			},
			{
				'textColor'	: 'white',
				'width'		: 52,
				'height'	: 52,
				'url'		: bkfolder + 'images/map-marker1.png',
				'textSize'	: 13,
				'fontFamily': "Helvetica, Arial, sans-serif"
			}
			]
		};

		markerExpStyle	= {
			boxStyle	: {
				width	: '132px',
				height	: 'auto'
			},
			pixelOffset	: new google.maps.Size( -70, -6 ),
			zIndex		: 10
		};
		markerCloStyle	= {
			boxStyle	: {
				width	: '50px',
				height	: '50px'
			},
			pixelOffset	: new google.maps.Size( -29, -6 ),
			zIndex		: 1
		};

		//create Cluster
		markerCluster = new MarkerClusterer(listingmap, markers, mcOptions);

		//marker infowindow details
		google.maps.event.addListener( markerCluster, 'clusteringend', function() {
			for ( var i in markers ) {
				var marker = markers[i];
				iwdiv = null;
				if ( marker.map !== null && marker.infoWindow === null ) {

					marker.infoWindow = new InfoBox({
						maxWidth				: 220,
						pixelOffset				: new google.maps.Size( -29, -6 ),
						boxStyle				: {
							width	: '50px',
							height	: '50px'
						},
						alignBottom				: true,
						closeBoxURL				: '',
						enableEventPropagation	: true,
						disableAutoPan			: true,
						zIndex					: 1,
						content					: marker.im
					});

					marker.infoWindowOpen = true;
					marker.infoWindow.open( listingmap, marker );

					//infor display on mouse hover
					google.maps.event.addListener( marker.infoWindow, 'domready', (function( marker, iwdiv ) {
						return function() {
							iwdiv = $( marker.infoWindow.div_ );



								iwdiv.on( 'mouseenter', function() {
									marker.infoWindow.setOptions( markerExpStyle );
									iwdiv.addClass( 'opened' );
								});

								iwdiv.on( 'mouseleave', function() {
									marker.infoWindow.setOptions( markerCloStyle );
									iwdiv.removeClass( 'opened' );
								});


						}
					})( marker, iwdiv ) );


			  }else if ( marker.map === null && marker.infoWindow !== null ) {
					marker.infoWindowOpen = false;

					if ( iwdiv !== null )
						iwdiv.off( '**' );

    marker.infoWindow.close();
    marker.infoWindow = null;
    }
    }
    });

    //marker fit to map
    markerCluster.fitMapToMarkers();
}