from __future__ import annotations

"""GraphRAG Intelligence Engine - Logging"""

import logging
import sys
from typing import Any

def setup_logging(level: int = logging.INFO) -> logging.Logger:
    """Set up structured logging for the application."""
    
    logging.basicConfig(
        level=level,
        format="%(asctime)s - %(name)s - %(levelname)s - %(request_id)s - %(message)s",
        handlers=[logging.StreamHandler(sys.stdout)],
    )
    
    return logging.getLogger("graphrag-intelligence")