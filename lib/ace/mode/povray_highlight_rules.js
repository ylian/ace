/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var POVRayHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
    var keywords = (
        "rotate|scale|translate|transform|matrix|perspective|orthographic|" +
        "fisheye|ultra_wide_angle|omnimax|panoramic|cylinder|spherical|location|" +
        "right|up|direction|sky|angle|look_at|blur_amples|aperture|focal_point|" +
        "confidence|variance|rgb|rgbf|rgbt|rgbft|red|blue|green|filter|transmit|" +
        "spline|linear_spline|quadratic_spline|" +
        "cubic_spline|natural_spline|object|blob|sphere|threshold|" +
        "hierarchy|box|cone|height_field|" +
        "smooth|water_level|lathe|julia_fractal|prism|superellipsoid|" +
        "sor|sturm|text|ttf|torus|disc|mesh|triangle|uv_vectors|smooth_triangle|" +
        "texture|inside_vector|mesh2|vertex_vectors|" +
        "normal_vectors|texture_list|face_indices|normal_indices|" +
        "uv_indices|polygon|plane|cubic|" +
        "quartic|quadric|isosurface|accuracy|" +
        "max_gradient|evaluate|open|max_trace|all_intersections|parametric|" +
        "contained_by|precompute|" +
        "union|split_union|intersection|difference|light_source|spotlight|" +
        "shadowless|parallel|radius|falloff|tightness|point_at|" +
        "area_light|adaptive|jitter|circular|orient|looks_like|fade_distance|" +
        "fade_power|media_attenuation|media_interaction|projected_through|" +
        "light_group|global_lights|clipped_by|bounded_by|no_shadow|" +
        "noimage|no_reflection|inverse|double_illuminate|hollow|" +
        "interior|material|interior_texture|photons|finish|" +
        "pigment|image_map|color_map|colour_map|pigment_map|quick_color|checker|" +
        "hexagon|brick|map_type|once|interpolate|" +
        "gif|tga|iff|ppm|pgm|png|jpeg|tiff|sys|normal|normal_map|slope_map|" +
        "bump_size|no_bump_scale|bump_map|" +
        "use_color|use_colour|ambient|diffuse|brilliance|phong|" +
        "phong_size|specular|roughness|metallic|reflection|crand|conserve_energy|" +
        "irid|fresnel|exponent|thickness|turbulence|" +
        "texture_map|tiles|tile2|material_map|uv_mapping|" +
        "cutaway_textures|average|boxed|bozo|bumps|cells|cylindrical|dents|" +
        "function|gradient|granite|leopard|marble|onion|pigment_pattern|planar|" +
        "radial|ripples|spiral1|spiral2|spotted|waves|wood|wrinkles|" +
        "agate|crackle|from|metric|offset|solid|density_file|df3|facets|coords|" +
        "size|mandel|exterior|magnet|julia|image_pattern|use_alpha|" +
        "quilted|control0|control1|slope|altitude|noise_generator|" +
        "octaves|omega|lambda|warp|repeat|flip|black_hole|strength|" +
        "toroidal|orientation|" +
        "dist_exp|major_radius|frequency|phase|ramp_wave|triangle_wave|" +
        "sine_wave|scallop_wave|cubic_wave|poly_wave|agate_turb|brick_size|" +
        "mortar|ior|caustics|dispersion|dispersion_samples|" +
        "fade_color|media|method|intervals|samples|" +
        "ratio|absorption|emission|aa_threshold|aa_level|" +
        "collect|scattering|eccentricity|extinction|density|" +
        "density_map|spacing|count|gather|" +
        "max_trace_level|abc_bailout|save_file|load_file|autostop|" +
        "expand_thresholds|background|fog|fog_type|fog_offset|fog_alt|" +
        "turb_depth|distance|sky_sphere|camera|" +
        "rainbow|width|arc_angle|falloff_angle|" +
        "global_settings|adc_bailout|ambient_light|assumed_gamma|hf_gray_16|" +
        "irid_wavelength|charset|max_intersections|" +
        "number_of_waves|radiosity|always_sample|brightness|" +
        "error_bound|gray_threshold|low_error_factor|max_sample|minimum_reuse|" +
        "nearest_count|pretrace_end|pretrace_start|recursion_limit"
    );

    var builtinConstants = (
        "false|no|off|on|pi|true|yes|x|y|z|t|u|v"
    );

    var builtinFunctions = (
        "abs|acos|acosh|asc|asin|asinh|atan|atanh|atan2|ceil|cos|cosh|defined|" +
        "degrees|dimensions|dimension_size|div|exp|file_exists|floor|int|ln|log|" +
        "max|min|mod|pow|radians|rand|seed|select|sin|sinh|sqrt|strcmp|strlen|" +
        "tan|tanh|val|vdot|vlength|min_extent|max_extent|trace|vaxis_rotate|" +
        "vcross|vrotate|vnormalize|vturbulence|str|concat|chr|substr|strupr|" +
        "strlwr|vstr|read|write|append"
    );

    var builtinTypes = (
        "clock|clock_delta|clock_on|final_clock|final_frame|frame_number|" +
        "initial_clock|initial_frame|color"
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "constant.language": builtinConstants,
        "support.type": builtinTypes,
        "keyword": keywords
    }, "identifier");

    this.$rules = {
        "start": [
            {
                token : "comment",
                regex : "\\/\\/.*$"
            },
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            },
            {
                token: "string",           // " string
                regex: '".*?"'
            },
            {
                token: 'constant.numeric.povray',
                regex: '\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b'
            },
            {
                token: "keyword.operator",
                regex: '(#declare|#local|#undef|#fopen|#fclose|#read|#write|#default|#version|#if|#else|#ifdef|#ifndef|#switch|#case|#range|#break|#while|#end|#macro|#debug|#error|#warning|#include)\\b'
            },
            {
                token: keywordMapper,
                regex: "[a-zA-Z][a-zA-Z0-9_]*\\b"
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : ".*?\\*\\/",
                next : "start"
            }, {
                defaultToken: "comment"
            }
        ]
    };

    this.normalizeRules();
};

oop.inherits(POVRayHighlightRules, TextHighlightRules);

exports.POVRayHighlightRules = POVRayHighlightRules;
});
