module.exports = {
  unmockedModulePathPatterns: ['react', 'enzyme', 'jest-enzyme'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jest-environment-jsdom-global',
  globals: {
    viewObjectsJson: true,
    shopJson: true,
    dataLayer: true,
    dataLayerV2Json: true,
    avisameController: true,
    headerController: true,
  },
};
