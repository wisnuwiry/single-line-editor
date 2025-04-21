import { PLUGIN_ID } from './pluginId'
import { Initializer } from './components/Initializer'
import { PluginIconCard } from './components/PluginIcon'

export default {
  register(app: any) {
    app.customFields.register({
      name: 'input',
      type: 'string',
      pluginId: PLUGIN_ID,
      icon: PluginIconCard,
      intlLabel: {
        id: `${PLUGIN_ID}.label`,
        defaultMessage: 'Single Line Editor',
      },
      intlDescription: {
        id: `${PLUGIN_ID}.description`,
        defaultMessage: 'Add a lightweight, single-line rich text editor to your content types.',
      },
      components: {
        Input: async () => import('./components/Input/Input'),
      },

      options: {
        base: [
          {
            intlLabel: {
              id: `${PLUGIN_ID}.options.base.toolbar`,
              defaultMessage: 'Toolbar',
            },
            description: {
              id: `${PLUGIN_ID}.options.base.toolbar.description`,
              defaultMessage: 'Enable the editor toolbar to help user accessibility.',
            },
            name: 'options.toolbar',
            type: 'checkbox',
          }
        ],
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: `${PLUGIN_ID}.options.advanced.requiredField`,
                  defaultMessage: 'Required field',
                },
                description: {
                  id: `${PLUGIN_ID}.options.advanced.requiredField.description`,
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    })

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    })
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`)

          return { data, locale }
        } catch {
          return { data: {}, locale }
        }
      })
    )
  },
}
