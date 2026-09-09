/* ─────────────────────────────────────────────────────────────
   canvas-util.js — shared responsive helpers for all
   "Basics in Mass Spectrometry" canvas animations.

   Include ONCE per page BEFORE the animation scripts:
     <script src="canvas-util.js"></script>

   Problem it solves: labels were positioned with fixed
   proportions and fixed font sizes, so on narrow screens
   (phones ~380px) they overflowed and overlapped.
   ───────────────────────────────────────────────────────────── */
(function(global){
  'use strict';

  /* A width considered "comfortable" (desktop card). Below this we
     scale fonts down proportionally so text keeps fitting. */
  var REF_W = 680;

  /* Responsive font size.
     base = font size (px) that looks right at REF_W.
     min  = never go below this (keeps text legible).
     Returns a CSS font string using the site's Thai/sans stack. */
  function msFont(W, base, min, weight){
    min = min || 9;
    var size = Math.max(min, Math.round(base * Math.min(1, W / REF_W)));
    return (weight ? weight + ' ' : '') + size + 'px "Noto Sans Thai", sans-serif';
  }

  /* Set ctx.font to a size that makes `text` fit within maxWidth.
     Starts from `base` px and shrinks until it fits (or hits min). */
  function fitText(ctx, text, maxWidth, base, min, weight){
    min = min || 8;
    var size = base;
    do {
      ctx.font = (weight ? weight + ' ' : '') + size + 'px "Noto Sans Thai", sans-serif';
      if (ctx.measureText(text).width <= maxWidth) break;
      size -= 1;
    } while (size > min);
    return size;
  }

  /* Draw a row of evenly spaced stage labels across [x0,x1] at y.
     Each label auto-shrinks to fit its own slot, so "1. spray
     2. charged droplets 3. shrink 4. fission" never overlaps.
     opts: {color, base, min, align} */
  function stageLabels(ctx, labels, x0, x1, y, opts){
    opts = opts || {};
    var color = opts.color || '#999990';
    var base  = opts.base  || 11;
    var min   = opts.min   || 8;
    var n = labels.length;
    var slot = (x1 - x0) / n;
    ctx.save();
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    for (var i = 0; i < n; i++){
      var cx = x0 + slot * (i + 0.5);
      fitText(ctx, labels[i], slot * 0.92, base, min);
      ctx.fillText(labels[i], cx, y);
    }
    ctx.restore();
  }

  /* Convenience: is this a narrow (phone-ish) canvas? */
  function isNarrow(W){ return W < 480; }

  global.MSUtil = {
    REF_W: REF_W,
    msFont: msFont,
    fitText: fitText,
    stageLabels: stageLabels,
    isNarrow: isNarrow
  };
})(window);
