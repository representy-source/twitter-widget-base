import TwitterWidgetBase from '../src/';

describe('TwitterWidgetBase', () => {
  describe('load', async () => {
    test('w/ required params', async () => {
      expect.assertions(2);
      try {
        const base = new TwitterWidgetBase();
        base.load();
      } catch (e) {
        expect(e).not.toBeNull();
        expect(e.message).toEqual(expect.stringContaining('type is required'));
      }
    });
    test('w/o type', async () => {
      expect.assertions(2);
      try {
        const base = new TwitterWidgetBase('type');
        base.load();
      } catch (e) {
        expect(e).not.toBeNull();
        expect(e.message).toEqual(expect.stringContaining('username is required'));
      }
    });

    test('w/ all options', async () => {
      const timeline = new TwitterWidgetBase(
        'timeline',
        {
          username: 'salimkayabasi',
          width: 400,
          height: 300,
          dnt: true,
          theme: 'dark',
          test: 'add-more-test-here',
          linkColor: '#292',
          invalid: 'invalid',
        },
        [
          'width',
          'height',
          'dnt',
          'theme',
          'test',
          'linkColor',
        ]);
      const result = await timeline.load();
      expect(result).toEqual(expect.stringContaining('class="twitter-timeline"'));
      expect(result).toEqual(expect.stringContaining('data-width="400"'));
      expect(result).toEqual(expect.stringContaining('data-height="300"'));
      expect(result).toEqual(expect.stringContaining('data-dnt="true"'));
      expect(result).toEqual(expect.stringContaining('data-theme="dark"'));
      expect(result).toEqual(expect.stringContaining('data-link-color="#292"'));
      expect(result).toEqual(expect.stringContaining('data-test="add-more-test-here"'));
      expect(result).not.toEqual(expect.stringContaining('data-invalid="'));
      expect(result).toEqual(expect.stringContaining('href=""'));
      expect(result).toEqual(expect.stringContaining('></a>'));
    });
  });
});
