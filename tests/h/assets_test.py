# -*- coding: utf-8 -*-

from sys import version_info
from StringIO import StringIO

from mock import patch

from h.assets import Environment

if version_info.major == 2:
    open_target = '__builtin__.open'
else:
    open_target = 'builtins.open'

BUNDLE_INI = \
"""
[bundles]
app_js =
  app.bundle.js
  vendor.bundle.js
"""

MANIFEST_JSON = \
"""
{
    "app.bundle.js": "app.bundle.js?abcdef",
    "vendor.bundle.js": "vendor.bundle.js?1234"
}
"""


def _fake_open(path):
    if path == 'bundles.ini':
        return StringIO(BUNDLE_INI)
    elif path == 'manifest.json':
        return StringIO(MANIFEST_JSON)


@patch(open_target, _fake_open)
@patch('os.path.getmtime')
def test_environment_lists_bundle_files(mtime):
    env = Environment('/assets', 'bundles.ini', 'manifest.json')

    assert env.files('app_js') == [
        'app.bundle.js',
        'vendor.bundle.js',
    ]


@patch(open_target, _fake_open)
@patch('os.path.getmtime')
def test_environment_generates_bundle_urls(mtime):
    env = Environment('/assets', 'bundles.ini', 'manifest.json')

    assert env.urls('app_js') == [
        '/assets/app.bundle.js?abcdef',
        '/assets/vendor.bundle.js?1234',
    ]


@patch(open_target)
@patch('os.path.getmtime')
def test_environment_reloads_manifest_on_change(mtime, open):
    manifest_content = '{"app.bundle.js":"app.bundle.js?oldhash"}'
    bundle_content = '[bundles]\napp_js = \n  app.bundle.js'

    def _fake_open(path):
        if path == 'bundles.ini':
            return StringIO(bundle_content)
        elif path == 'manifest.json':
            return StringIO(manifest_content)

    open.side_effect = _fake_open
    mtime.return_value = 100
    env = Environment('/assets', 'bundles.ini', 'manifest.json')

    # An initial call to urls() should read and cache the manifest
    env.urls('app_js')

    manifest_content = '{"app.bundle.js":"app.bundle.js?newhash"}'
    assert env.urls('app_js') == ['/assets/app.bundle.js?oldhash']

    # Once the manifest's mtime changes, the Environment should re-read
    # the manifest
    mtime.return_value = 101
    assert env.urls('app_js') == ['/assets/app.bundle.js?newhash']
