from django.test import TestCase


class SimpleTest(TestCase):
    def setup(self):
        pass

    def test_simple(self):
        TestCase.fail()
