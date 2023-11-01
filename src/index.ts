import {comment} from "postcss"
import * as plugin from "tailwindcss/plugin"
import {version} from "../package.json"

/** @type {import('tailwindcss').Config} */
module.exports = plugin.withOptions(
  function () {
    return function ({ addUtilities, addBase, matchUtilities, theme }: any) {
      addBase([
        comment({
          text: `!  tailwindcss-reflection v${version} | MIT License | https://designbycode.co.za`,
        }),
      ])

      addBase({
        ":root": {
          "--r-position": "below",
          "--r-offset": "0",
          "--r-opacity": "1",
          "--r-direction": "to bottom",
        },
      })

      addUtilities({
        ".reflect": {
          "-webkit-box-reflect": `var(--r-position) var(--r-offset) linear-gradient(var(--r-direction), transparent, rgba(0,0,0, var(--r-opacity)))`,
        },
      })

      matchUtilities(
        {
          reflect: (value: string) => {
            const direction: any = { none: "to bottom", below: "to bottom", above: "to top", right: "to right", left: "to left" }
            return {
              "--r-position": value,
              "--r-direction": direction[value],
            }
          },
        },
        {
          values: theme("position"),
          type: "position",
        }
      )

      matchUtilities(
        {
          "reflect-opacity": (value: string) => ({
            "--r-opacity": value,
          }),
        },
        {
          values: theme("opacity"),
        }
      )
      matchUtilities(
        {
          "reflect-offset": (value: string) => ({
            "--r-offset": value,
          }),
        },
        {
          values: theme("offset"),
          type: "length",
        }
      )
    }
  },
  function () {
    return {
      theme: {
        position: {
          none: "none",
          above: "above",
          below: "below",
          left: "left",
          right: "right",
        },
        offset: {
          0: "0",
          1: "0.25rem",
          2: "0.5rem",
          3: "0.75rem",
          4: "1rem",
          5: "1.5rem",
          6: "2rem",
          7: "3rem",
          8: "4rem",
          9: "5rem",
          10: "6rem",
        },
        opacity: {
          0: "0",
          5: "0.05",
          10: "0.1",
          15: "0.15",
          20: "0.2",
          25: "0.25",
          30: "0.3",
          40: "0.4",
          45: "0.45",
          50: "0.5",
          55: "0.55",
          60: "0.6",
          70: "0.7",
          75: "0.75",
          80: "0.8",
          85: "0.85",
          90: "0.9",
          95: "0.95",
          100: "1",
        },
      },
    }
  }
)
