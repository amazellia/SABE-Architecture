/*
This is still a work in progress

Goal: to organise rich-text from StoryblokInit's rich text scheme
into another file. 
*/
import RichTextResolver from 'storyblok-js-client/richTextResolver'
import MySchema from 'storyblok-js-client/schema'

MySchema.nodes.heading = function (node) {
  let attrs = {}

  if (
    node.content &&
    node.content.length === 1 &&
    node.content[0].marks &&
    node.content[0].marks.length === 1 &&
    node.content[0].marks[0].type === 'styled'
  ) {
    attrs = node.content[0].marks[0].attrs
    delete node.content[0].marks
  }

  return {
    tag: [
      {
        tag: `h${node.attrs.level}`,
        attrs: attrs,
      },
    ],
  }
}

let rteResolver = new RichTextResolver(MySchema)
let rendered = rteResolver.render({
  content: [
    {
      content: [
        {
          text: 'Normal headline',
          type: 'text',
        },
      ],
      type: 'paragraph',
    },
    {
      attrs: {
        level: 3,
      },
      content: [
        {
          marks: [
            {
              attrs: {
                class: 'margin-bottom-fdsafdsada',
              },
              type: 'styled',
            },
          ],
          text: 'Styled headline',
          type: 'text',
        },
      ],
      type: 'heading',
    },
  ],
  type: 'doc',
})

console.log(rendered)