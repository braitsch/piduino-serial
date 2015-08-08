
$(function() {

	var colors = {
		on	: '#FF8000',
		off	: '#333333'
	}
	var machines = [];
	var onSegmentClick = function(e)
	{
		var id = e.target.id.split('/');
		var machineId = id[0];
		var segmentId = id[1];
	//	console.log(machineId, segmentId);
		var segment = machines[machineId].segments[segmentId]; 
		if (segment.fill == colors.on){
			segment.fill = colors.off;
		}	else if (segment.fill == colors.off){
			segment.fill = colors.on;
		}
		machines[machineId].renderer.update();
	}
	
	var drawSegment = function(x, y, w, h, id, machine, rotation)
	{
		var segment = machine.renderer.makeRectangle(x, y, w, h);
		segment.rotation = rotation || 0;
		segment.translation._x+=w/2;
		segment.translation._y+=h/2;
		segment.id = machine.id+'/'+id;
		segment.fill = colors.off;
		segment.opacity = 1;
		segment.noStroke();
		machine.segments.push(segment);
		machine.renderer.update();
		$(segment._renderer.elem).css('cursor', 'pointer').click(onSegmentClick);
	}
	
	$('.btn').click(function(e){
		$('.btn').each(function(id, el ) {
			if (el == e.target) {
				var machineId = id;
				var segmentsOn = [];
				for (var i = machines[id].segments.length - 1; i >= 0; i--) {
					var segment = machines[id].segments[i];
					if (segment.fill == colors.on){
						segmentsOn.push(parseInt(segment.id.substr(segment.id.indexOf('/')+1)));
					}
				}
		// ajax call to server -!_!-
				$.post('sendMessage', { machine:machineId, segments:segmentsOn}).done(function( data ) {
					console.log('data successfully sent', data);
				});
			}
		});
	});
	
	$('.machine').each(function(i, el ) {
		$(el).attr('id', 'machine-'+i);
		var segments = $(el).find('.segments');
		var machine = {
			id: i,
			segments: []
		};
		var params = { width: 600, height: 600 };
		machine.renderer = new Two(params).appendTo(segments[0]);
		machines.push(machine);
	// draw the segments //
		var seg_width = 20;
		var seg_height1 = 60; // mid segments
		var seg_height2 = 80; // top & bottom
		var v_spacing = seg_width;
		var x, y, w, h;
	// A
		x = 0; y = seg_width; w = seg_width; h = seg_height2;
		drawSegment(x, y, w, h, 0, machine);
	// B
		y+= h + v_spacing;
		h = seg_height1;
		drawSegment(x, y, w, h, 1, machine);
	// C
		y+= h + v_spacing;
		h = seg_height1;
		drawSegment(x, y, w, h, 2, machine);
	// D
		y+= h + v_spacing;
		h = seg_height2;
		drawSegment(x, y, w, h, 3, machine);
	// A
		x = seg_width+seg_height2; y = seg_width; w = seg_width; h = seg_height2;
		drawSegment(x, y, w, h, 4, machine);
	// B
		y+= h + v_spacing;
		h = seg_height1;
		drawSegment(x, y, w, h, 5, machine);
	// C
		y+= h + v_spacing;
		h = seg_height1;
		drawSegment(x, y, w, h, 6, machine);
	// D
		y+= h + v_spacing;
		h = seg_height2;
		drawSegment(x, y, w, h, 7, machine);
	// I
		x = seg_width;
		w = seg_height2;
		h = seg_width;
		drawSegment(x, 0, w, h, 8, machine);
	// J
		drawSegment(x, 50, w, h, 9, machine, 0.75*Math.PI);
	// K
		y = seg_width + seg_height2;
		drawSegment(x, y, w, h, 10, machine);
	// L
		y+= seg_width;
		x = seg_width + (seg_height1/2);
		w = seg_width;
		h = seg_height1;
		drawSegment(x, y, w, h, 11, machine);
	// M
		x = seg_width;
		y+= seg_height1;
		w = seg_height2;
		h = seg_width;
		drawSegment(x, y, w, h, 12, machine);
	// N
		y+= seg_width;
		x = seg_width
		w = seg_width;
		h = seg_height1;
		drawSegment(x+5, y, w, h, 13, machine, 0.85*Math.PI);
	// O
		x = seg_width + (seg_height1/2);
		w = seg_width;
		h = seg_height1;
		drawSegment(x, y, w, h, 14, machine);
	// P
		x = seg_width + seg_height1;
		w = seg_width;
		h = seg_height1;
		drawSegment(x-5, y, w, h, 15, machine, 0.15*Math.PI);
	// Q
		x = seg_width;
		y+= seg_height1;
		w = seg_height2;
		h = seg_width;
		drawSegment(x, y, w, h, 16, machine);
	// R
		y+= seg_width+seg_height2;
		drawSegment(x, y, w, h, 17, machine);
	});
	
});
