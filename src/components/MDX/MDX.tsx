import * as React from 'react';
import {
  MDXProvider,
  ComponentDictionary,
  mdx as mdxCreateElement,
} from '@mdx-js/react';

type MDXProps = {
  code: string;
  scope?: object;
  components?: ComponentDictionary;
};

// FIXME: see how this can be optimized
export const MDX: React.FC<MDXProps> = ({
  code = '',
  scope = {},
  components = {},
  ...props
}) => {
  const fullScope = {
    mdx: mdxCreateElement,
    MDXProvider,
    components,
    props,
    ...scope,
  };

  const keys = Object.keys(fullScope);
  const values = Object.values(fullScope);

  /* eslint-disable no-new-func, @typescript-eslint/no-implied-eval */
  const fn = React.useMemo(
    () =>
      new Function(
        'React',
        ...keys,
        `${code}
          return React.createElement(MDXProvider, { components },
            React.createElement(MDXContent, props)
          );
        `,
      ),
    [code],
  );
  /* eslint-enable no-new-func, @typescript-eslint/no-implied-eval */

  return React.useMemo(() => fn(React, ...values), values);
};
