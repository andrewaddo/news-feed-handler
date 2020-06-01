import unittest
import sys
sys.path.insert(0, 'src')

from propertiesHandler import PropertiesHandler

properties = PropertiesHandler()


class TestTableNames(unittest.TestCase):

	def test_ProfileTable(self):
		self.assertIsNotNone(
			properties.getProfileConfigTable(), "Should not be None")

	def test_SearchTable(self):
		self.assertIsNotNone(
			properties.getSearchConfigTable(), "Should not be None")

	def test_NewsTable(self):
		self.assertIsNotNone(
			properties.getNewsTable(), "Should not be None")

if __name__ == '__main__':
		unittest.main()
