from ledfx.api import RestEndpoint
from aiohttp import web
import logging
import json

_LOGGER = logging.getLogger(__name__)

class ConfigEndpoint(RestEndpoint):

    ENDPOINT_PATH = "/api/config"

    async def get(self) -> web.Response:
        response = {
            'config': self._ledfx._config
        }

        return web.Response(text=json.dumps(response), status=200)
