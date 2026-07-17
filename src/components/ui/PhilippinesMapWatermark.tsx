/**
 * A stylized, simplified silhouette of the Philippine archipelago (Luzon,
 * the Visayas island cluster, Mindanao, and Palawan) used as a subtle
 * decorative watermark. It's an original, abstracted shape drawn for this
 * purpose — not a traced copy of any particular published map — which is
 * appropriate for a low-opacity background accent where geographic
 * precision isn't the point.
 */
export function PhilippinesMapWatermark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 460" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      {/* Luzon */}
      <path
        d="M150 18
           C168 24 180 42 182 64
           C184 84 176 96 188 108
           C202 118 208 136 198 154
           C190 168 174 166 162 154
           C154 146 150 152 146 164
           C130 156 116 142 106 124
           C96 106 92 86 98 66
           C104 44 122 26 150 18 Z"
      />
      {/* Visayas cluster */}
      <path
        d="M78 214
           C90 208 104 212 110 224
           C116 236 108 248 94 250
           C80 252 68 244 66 230
           C65 222 70 217 78 214 Z"
      />
      <path
        d="M112 232
           C124 226 138 232 142 246
           C146 260 136 272 122 272
           C108 272 98 262 98 248
           C98 240 103 235 112 232 Z"
      />
      <path
        d="M148 220
           C156 216 164 220 166 230
           C168 244 164 262 156 268
           C148 262 144 244 146 230
           C147 225 147 222 148 220 Z"
      />
      <path
        d="M170 244
           C180 240 190 246 191 256
           C192 266 184 274 174 273
           C164 272 158 262 161 253
           C163 248 165 246 170 244 Z"
      />
      <path
        d="M182 202
           C194 198 208 204 210 216
           C212 226 202 234 190 232
           C178 230 172 220 174 210
           C175 206 178 204 182 202 Z"
      />
      {/* Mindanao */}
      <path
        d="M110 300
           C138 288 176 292 204 306
           C222 316 228 334 224 352
           C220 368 228 386 214 402
           C200 416 178 420 160 416
           C142 412 122 418 106 404
           C92 392 86 374 90 356
           C93 340 88 322 96 308
           C100 302 104 302 110 300 Z"
      />
      {/* Palawan */}
      <path
        d="M34 190
           C44 184 54 192 58 206
           C62 224 58 244 52 264
           C47 282 40 300 30 312
           C22 302 18 284 21 266
           C24 248 20 228 23 210
           C25 200 28 194 34 190 Z"
      />
    </svg>
  );
}
